import { useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Aftermath } from 'aftermath-ts-sdk';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useWeb3 } from '@/hooks/use-web3';
import { isSui } from '@/utils';

import { SwapForm } from './swap.types';
import { isNativeRoute } from './swap.utils';

const INIT_ARG = {
  [Network.TESTNET]: 'TESTNET',
  [Network.MAINNET]: 'MAINNET',
};

export const useAftermathRouter = () => {
  const { network } = useSuiClientContext();

  return new Aftermath(INIT_ARG[network as Network]).Router();
};

export const useSwap = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const afRouter = useAftermathRouter();
  const currentAccount = useCurrentAccount();

  return async (values: SwapForm): Promise<TransactionBlock> => {
    invariant(values.route && currentAccount, 'Something went wrong');

    if (!isNativeRoute(values.route))
      return (await afRouter.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: values.route,
        slippage: Number(values.settings.slippage),
      })) as unknown as TransactionBlock;

    const route = values.route.routes[0];

    const auxTxb = new TransactionBlock();

    const [coinIn] = [values.from].map(({ type, value }) => {
      if (isSui(type))
        return auxTxb.splitCoins(auxTxb.gas, [
          auxTxb.pure(value.decimalPlaces(0).toFixed(0)),
        ])[0];

      const [firstCoin, ...otherCoins] = coinsMap[type].objects;

      const firstCoinObject = auxTxb.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        auxTxb.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const [splittedCoin] = auxTxb.splitCoins(firstCoinObject, [
        auxTxb.pure(value.decimalPlaces(0).toFixed(0)),
      ]);

      return splittedCoin;
    });

    const { coinOut, txb } = clamm.swapRoute({
      coinIn,
      txb: auxTxb as any,
      route: [route[0], route[1]],
      poolsMap: values.route.poolsMap,
      slippage: Number((+values.settings.slippage * 100).toFixed(0)),
    });

    txb.transferObjects([coinOut], txb.pure(currentAccount.address));

    return txb as unknown as TransactionBlock;
  };
};
