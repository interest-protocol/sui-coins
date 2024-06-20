import { useCurrentAccount } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Aftermath } from 'aftermath-ts-sdk';
import invariant from 'tiny-invariant';

import {
  CLAMM_PACKAGE_ADDRESSES,
  COIN_TO_WRAPPED,
  SCALLOP_WRAPPED_COINS_TREASURY_CAPS,
} from '@/constants/clamm';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useHopSdk } from '@/hooks/use-hop-sdk';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { isSui } from '@/utils';

import { SwapForm } from './swap.types';
import { isAftermathRoute, isNativeRoute } from './swap.utils';

export const useAftermathRouter = () => new Aftermath('MAINNET').Router();

export const useSwap = () => {
  const hopSdk = useHopSdk();
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const afRouter = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const network = useNetwork();
  const pkgs = CLAMM_PACKAGE_ADDRESSES[network];

  return async (values: SwapForm): Promise<Transaction> => {
    invariant(values.route && currentAccount, 'Something went wrong');

    if (!isNativeRoute(values.route)) {
      if (isAftermathRoute(values.route))
        return afRouter.getTransactionForCompleteTradeRoute({
          walletAddress: currentAccount.address,
          completeRoute: values.route,
          slippage: Number(values.settings.slippage),
        });

      const trade = values.route.trade;

      return hopSdk.swap(
        trade,
        currentAccount.address,
        +values.settings.slippage * 100
      ) as unknown as Transaction;
    }

    // Native Swap - Interest

    const route = values.route.routes[0];

    const auxTx = new Transaction();

    const [coinIn] = [values.from].map(({ type, value }) => {
      if (isSui(type))
        return auxTx.splitCoins(auxTx.gas, [
          auxTx.pure.u64(value.decimalPlaces(0).toFixed(0)),
        ])[0];

      const [firstCoin, ...otherCoins] = coinsMap[type].objects;

      const firstCoinObject = auxTx.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        auxTx.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const [splittedCoin] = auxTx.splitCoins(firstCoinObject, [
        auxTx.pure.u64(value.decimalPlaces(0).toFixed(0)),
      ]);

      const wrappedCoin = COIN_TO_WRAPPED[network][normalizeStructTag(type)];

      if (wrappedCoin) {
        const cap = SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][wrappedCoin];

        const coinOut = auxTx.moveCall({
          target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::mint`,
          typeArguments: [type, wrappedCoin],
          arguments: [auxTx.object(cap), splittedCoin],
        });

        return coinOut;
      }

      return splittedCoin;
    });

    const { coinOut, tx } = clamm.swapRoute({
      coinIn,
      tx: auxTx,
      route: [route[0], route[1]],
      poolsMap: values.route.poolsMap,
      slippage: Number((+values.settings.slippage * 100).toFixed(0)),
    });

    const wrappedCoin =
      COIN_TO_WRAPPED[network][normalizeStructTag(values.to.type)];

    if (wrappedCoin) {
      const cap =
        SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][
          normalizeStructTag(wrappedCoin)
        ];

      const coinY = tx.moveCall({
        target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::burn`,
        typeArguments: [normalizeStructTag(values.to.type), wrappedCoin],
        arguments: [tx.object(cap), coinOut],
      });

      tx.transferObjects([coinY], tx.pure.address(currentAccount.address));
    } else {
      tx.transferObjects([coinOut], tx.pure.address(currentAccount.address));
    }

    return tx;
  };
};
