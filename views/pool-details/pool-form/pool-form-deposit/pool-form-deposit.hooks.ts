import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import invariant from 'tiny-invariant';

import {
  CLAMM_PACKAGE_ADDRESSES,
  SCALLOP_WRAPPED_COINS_TREASURY_CAPS,
  WRAPPED_CONVERSION_MAP,
} from '@/constants/clamm';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import {
  getAmountMinusSlippage,
  isScallopPool,
  isSui,
  parseBigNumberish,
} from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

export const useDeposit = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();
  const network = useNetwork();
  const pkgs = CLAMM_PACKAGE_ADDRESSES[network];

  return async (values: PoolForm): Promise<TransactionBlock> => {
    const { tokenList, pool, settings } = values;

    invariant(currentAccount, 'Must to connect your wallet');
    invariant(tokenList.length, 'No tokens ');

    const initTxb = new TransactionBlock();

    const isScallop = isScallopPool({
      poolObjectId: pool.poolObjectId,
      network,
    });

    const coins = tokenList.map(({ value, type }) => {
      const [firstCoin, ...otherCoins] = coinsMap[type].objects;

      const firstCoinObject = initTxb.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        initTxb.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const [splittedCoin] = initTxb.splitCoins(
        isSui(type) ? initTxb.gas : firstCoinObject,
        [
          initTxb.pure(
            FixedPointMath.toBigNumber(value, coinsMap[type].decimals)
              .decimalPlaces(0)
              .toString()
          ),
        ]
      );

      if (isScallop && !!WRAPPED_CONVERSION_MAP[network][type]) {
        const wrappedType = WRAPPED_CONVERSION_MAP[network][type];
        const cap = SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][wrappedType];

        if (!cap) return splittedCoin;

        const wrappedCoin = initTxb.moveCall({
          target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::mint`,
          typeArguments: [type, wrappedType],
          arguments: [initTxb.object(cap), splittedCoin],
        });

        return wrappedCoin;
      }

      return splittedCoin;
    });

    const minAmountQuote = await clamm.quoteAddLiquidity({
      pool: pool.poolObjectId,
      amounts: tokenList.map(({ value, decimals }) =>
        BigInt(
          FixedPointMath.toBigNumber(value, decimals)
            .decimalPlaces(0)
            .toString()
        )
      ),
    });

    const minAmountWithSlippage = getAmountMinusSlippage(
      parseBigNumberish(minAmountQuote),
      settings.slippage
    )
      .decimalPlaces(0)
      .toString();

    const minAmount = BigInt(minAmountWithSlippage);

    const { lpCoin, txb } = await clamm.addLiquidity({
      minAmount,
      coinsIn: coins,
      txb: initTxb as any,
      pool: pool.poolObjectId,
    });

    txb.transferObjects([lpCoin], txb.pure.address(currentAccount.address));

    return txb as unknown as TransactionBlock;
  };
};
