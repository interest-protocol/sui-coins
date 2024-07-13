import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@wallet-standard/base';

import { PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import {
  createObjectsParameter,
  getAmountMinusSlippage,
  getSafeValue,
} from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import { getAmmXYAmount } from '../pool-form.utils';

export const useWithdraw = () => {
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

    const amount = getSafeValue({
      coinType: lpCoin.type,
      coinValue: lpCoin.value,
      decimals: lpCoin.decimals,
      balance: lpCoinWallet.balance,
    });

    const lpCoinInList = createObjectsParameter({
      coinsMap,
      txb: txb,
      type: lpCoin.type,
      amount: amount.toString(),
    });

    const lpCoinIn = txb.moveCall({
      target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
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
      target: `${PACKAGES[network].DEX}::interest_protocol_amm::remove_liquidity`,
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
