import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import {
  CLAMM_PACKAGE_ADDRESSES,
  SCALLOP_WRAPPED_COINS_TREASURY_CAPS,
  WRAPPED_CONVERSION_MAP,
} from '@/constants/clamm';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoinOfValue, getSafeValue, isScallopPool } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

export const useDeposit = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const network = useNetwork();
  const pkgs = CLAMM_PACKAGE_ADDRESSES[network];

  return async (values: PoolForm): Promise<Transaction> => {
    const { tokenList, pool, settings } = values;

    invariant(currentAccount, 'Must to connect your wallet');
    invariant(tokenList.length, 'No tokens ');

    const initTx = new Transaction();

    const isScallop = isScallopPool({
      poolObjectId: pool.poolObjectId,
      network,
    });

    const coins = await Promise.all(
      tokenList.map(async ({ value, type }) => {
        if (!+value) {
          const rightType =
            isScallop && !!WRAPPED_CONVERSION_MAP[network][type]
              ? WRAPPED_CONVERSION_MAP[network][type]
              : type;

          const coinZero = initTx.moveCall({
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

        const splittedCoin = await getCoinOfValue({
          suiClient,
          tx: initTx,
          coinType: type,
          coinValue: safeValue.toString(),
          account: currentAccount.address,
        });

        if (isScallop && !!WRAPPED_CONVERSION_MAP[network][type]) {
          const wrappedType = WRAPPED_CONVERSION_MAP[network][type];
          const cap = SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][wrappedType];

          if (!cap) return splittedCoin;

          const wrappedCoin = initTx.moveCall({
            target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::mint`,
            typeArguments: [type, wrappedType],
            arguments: [initTx.object(cap), splittedCoin],
          });

          return wrappedCoin;
        }

        return splittedCoin;
      })
    );

    const { lpCoin, tx } = await clamm.addLiquidity({
      coinsIn: coins,
      tx: initTx as any,
      pool: pool.poolObjectId,
      slippage: +settings.slippage,
    });

    tx.transferObjects([lpCoin], tx.pure.address(currentAccount.address));

    return tx as unknown as Transaction;
  };
};
