import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { getCoinOfValue } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

export const useWithdraw = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return async (values: PoolForm): Promise<TransactionBlock> => {
    const { tokenList, pool, lpCoin: coin, tokenSelected } = values;

    if (!+coin.value || !tokenList.length) throw new Error('No tokens ');

    if (!currentAccount) throw new Error('No account found');

    const lpCoinWallet = coinsMap[coin.type];

    if (!lpCoinWallet) throw new Error('Check the wallet Lp coins');

    const initTxb = new TransactionBlock();

    const coinValue = FixedPointMath.toBigNumber(coin.value, coin.decimals)
      .decimalPlaces(0)
      .toString();

    const lpCoin = await getCoinOfValue({
      suiClient,
      coinValue,
      txb: initTxb,
      coinType: coin.type,
      account: currentAccount.address,
    });

    let coinsOut = [];
    let txb: TransactionBlock;

    if (tokenSelected) {
      const response = await clamm.removeLiquidityOneCoin({
        lpCoin,
        txb: initTxb as any,
        pool: pool.poolObjectId,
        coinOutType: tokenSelected,
      });

      coinsOut = [response.coinOut];
      txb = response.txb as unknown as TransactionBlock;
    } else {
      const response = await clamm.removeLiquidity({
        lpCoin,
        txb: initTxb as any,
        pool: pool.poolObjectId,
      });

      coinsOut = response.coinsOut;
      txb = response.txb as unknown as TransactionBlock;
    }

    txb.transferObjects(coinsOut, txb.pure.address(currentAccount.address));

    return txb as TransactionBlock;
  };
};
