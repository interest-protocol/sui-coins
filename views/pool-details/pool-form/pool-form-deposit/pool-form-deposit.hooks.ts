import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import invariant from 'tiny-invariant';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { getAmountMinusSlippage, isSui, parseBigNumberish } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

export const useDeposit = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (values: PoolForm): Promise<TransactionBlock> => {
    const { tokenList, pool, settings } = values;

    invariant(currentAccount, 'Must to connect your wallet');
    invariant(tokenList.length, 'No tokens ');

    const initTxb = new TransactionBlock();

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
