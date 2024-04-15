import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@wallet-standard/base';

import { PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { createObjectsParameter, getAmountMinusSlippage } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import { getAmmLpCoinAmount, getSafeValue } from '../pool-form.utils';

export const useDeposit = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();

  return (values: PoolForm, account: WalletAccount | null) => {
    const { tokenList, pool, lpCoin, settings } = values;

    if (!tokenList.length) throw new Error('No tokens ');

    if (!account) throw new Error('No account found');

    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (!+coin0.value || !+coin1.value)
      throw new Error('Check the coins value');

    const walletCoin0 = coinsMap[coin0.type];
    const walletCoin1 = coinsMap[coin1.type];

    if (!walletCoin0 || !walletCoin1) throw new Error('Check the wallet coins');

    const txb = new TransactionBlock();

    const amount0 = getSafeValue(coin0, walletCoin0.balance);

    const amount1 = getSafeValue(coin1, walletCoin1.balance);

    const coin0InList = createObjectsParameter({
      coinsMap,
      txb: txb,
      type: coin0.type,
      amount: amount0.toString(),
    });

    const coin1InList = createObjectsParameter({
      coinsMap,
      txb: txb,
      type: coin1.type,
      amount: amount1.toString(),
    });

    const coin0In = txb.moveCall({
      target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
      typeArguments: [coin0.type],
      arguments: [
        txb.makeMoveVec({
          objects: coin0InList,
        }),
        txb.pure(amount0),
      ],
    });

    const coin1In = txb.moveCall({
      target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
      typeArguments: [coin1.type],
      arguments: [
        txb.makeMoveVec({
          objects: coin1InList,
        }),
        txb.pure(amount1),
      ],
    });

    const lpAmount = getAmmLpCoinAmount(
      FixedPointMath.toBigNumber(coin0.value, coin0.decimals),
      FixedPointMath.toBigNumber(coin1.value, coin1.decimals),
      pool.balanceX,
      pool.balanceY,
      pool.lpCoinSupply
    );

    const minimumAmount = getAmountMinusSlippage(lpAmount, settings.slippage);

    const [lpCoinOut, coinXOut, coinYOut] = txb.moveCall({
      target: `${PACKAGES[network].DEX}::interest_protocol_amm::add_liquidity`,
      typeArguments: [coin0.type, coin1.type, lpCoin.type],
      arguments: [
        txb.object(pool.poolId),
        coin0In,
        coin1In,
        txb.pure(minimumAmount),
      ],
    });

    txb.transferObjects(
      [lpCoinOut, coinXOut, coinYOut],
      txb.pure(account.address)
    );

    return txb;
  };
};
