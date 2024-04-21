import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@wallet-standard/base';

import { OBJECT_RECORD } from '@/constants';
import { useNetwork } from '@/context/network';
import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { createObjectsParameter, getAmountMinusSlippage } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import { getAmmXYAmount, getSafeValue } from '../pool-form.utils';

export const useClammWithdraw = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();

  return async (values: PoolForm, account: WalletAccount | null) => {
    const { tokenList, pool, lpCoin, settings } = values;

    if (!+lpCoin.value || !tokenList.length) throw new Error('No tokens ');

    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (!account) throw new Error('No account found');

    const lpCoinWallet = coinsMap[lpCoin.type];

    if (!lpCoinWallet) throw new Error('Check the wallet Lp coins');

    const txb = new TransactionBlock();

    console.log({ network, settings, coin0, coin1 });

    if (!isClammPool(pool)) throw new Error('Pool is not AMM Pool');

    return txb;
  };
};
export const useAmmWithdraw = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();

  return async (values: PoolForm, account: WalletAccount | null) => {
    const { tokenList, pool, lpCoin, settings } = values;

    if (!+lpCoin.value || !tokenList.length) throw new Error('No tokens ');

    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (!account) throw new Error('No account found');

    const lpCoinWallet = coinsMap[lpCoin.type];

    if (!lpCoinWallet) throw new Error('Check the wallet Lp coins');

    const txb = new TransactionBlock();

    if (isClammPool(pool)) throw new Error('Pool is not AMM Pool');

    const amount = getSafeValue(lpCoin, lpCoinWallet.balance);

    const lpCoinInList = createObjectsParameter({
      coinsMap,
      txb: txb,
      type: lpCoin.type,
      amount: amount.toString(),
    });

    const lpCoinIn = txb.moveCall({
      target: `${OBJECT_RECORD[network].UTILS_PACKAGE_ID}::utils::handle_coin_vector`,
      typeArguments: [lpCoin.type],
      arguments: [txb.makeMoveVec({ objects: lpCoinInList }), txb.pure(amount)],
    });

    const [expectedXAmount, expectedYAmount] = getAmmXYAmount(
      FixedPointMath.toBigNumber(lpCoin.value),
      pool.balanceX,
      pool.balanceY,
      pool.lpCoinSupply
    );
    const minimumXAmount = getAmountMinusSlippage(
      expectedXAmount,
      settings.slippage
    );
    const minimumYAmount = getAmountMinusSlippage(
      expectedYAmount,
      settings.slippage
    );

    const [coinXOut, coinYOut] = txb.moveCall({
      target: `${OBJECT_RECORD[network].DEX_PACKAGE_ID}::interest_protocol_amm::remove_liquidity`,
      typeArguments: [coin0.type, coin1.type, lpCoin.type],
      arguments: [
        txb.object(pool.poolId),
        lpCoinIn,
        txb.pure(minimumXAmount),
        txb.pure(minimumYAmount),
      ],
    });

    txb.transferObjects([coinXOut, coinYOut], txb.pure(account.address));

    return txb;
  };
};
