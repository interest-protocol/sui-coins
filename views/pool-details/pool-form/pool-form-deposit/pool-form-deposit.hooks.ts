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
  getSafeValue,
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
      if (!+value) {
        const rightType =
          isScallop && !!WRAPPED_CONVERSION_MAP[network][type]
            ? WRAPPED_CONVERSION_MAP[network][type]
            : type;

        const coinZero = initTxb.moveCall({
          target: `0x2::coin::zero`,
          typeArguments: [rightType],
        });

        return coinZero;
      }

      const safeValue = getSafeValue({
        coinValue: value,
        coinType: type,
        balance: coinsMap[type].balance,
        decimals: coinsMap[type].decimals,
      });

      if (isSui(type)) {
        const [splittedCoin] = initTxb.splitCoins(initTxb.gas, [
          initTxb.pure.u64(safeValue.toString()),
        ]);

        return splittedCoin;
      }

      const [firstCoin, ...otherCoins] = coinsMap[type].objects;

      const firstCoinObject = initTxb.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        initTxb.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const [splittedCoin] = initTxb.splitCoins(firstCoinObject, [
        initTxb.pure.u64(safeValue.toString()),
      ]);

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

    const { lpCoin, txb } = await clamm.addLiquidity({
      coinsIn: coins,
      txb: initTxb as any,
      pool: pool.poolObjectId,
      slippage: +settings.slippage,
    });

    txb.transferObjects([lpCoin], txb.pure.address(currentAccount.address));

    return txb as unknown as TransactionBlock;
  };
};
