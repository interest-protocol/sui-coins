import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { TransactionResult } from '@mysten/sui.js/transactions';
import { TransactionBlock } from '@mysten/sui.js/transactions';

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

export const useWithdraw = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const network = useNetwork();
  const pkgs = CLAMM_PACKAGE_ADDRESSES[network];

  return async (values: PoolForm): Promise<TransactionBlock> => {
    const { tokenList, pool, lpCoin: coin, tokenSelected } = values;

    if (!+coin.value || !tokenList.length) throw new Error('No tokens ');

    if (!currentAccount) throw new Error('No account found');

    const lpCoinWallet = coinsMap[coin.type];

    if (!lpCoinWallet) throw new Error('Check the wallet Lp coins');

    const initTxb = new TransactionBlock();

    const coinValue = getSafeValue({
      coinValue: coin.value,
      coinType: coin.type,
      balance: lpCoinWallet.balance,
      decimals: lpCoinWallet.decimals,
    }).toString();

    const lpCoin = await getCoinOfValue({
      suiClient,
      coinValue,
      txb: initTxb,
      coinType: coin.type,
      account: currentAccount.address,
    });

    let coinsOut = [];
    let txb: TransactionBlock;

    const isScallop = isScallopPool({
      poolObjectId: pool.poolObjectId,
      network,
    });

    if (tokenSelected) {
      const convertedType = WRAPPED_CONVERSION_MAP[network][tokenSelected];

      const response = await clamm.removeLiquidityOneCoin({
        lpCoin,
        txb: initTxb as any,
        pool: pool.poolObjectId,
        coinOutType: convertedType || tokenSelected,
      });

      txb = response.txb as unknown as TransactionBlock;

      if (convertedType) {
        const cap = SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][convertedType];

        const unwrappedCoin = initTxb.moveCall({
          target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::burn`,
          typeArguments: [tokenSelected, convertedType],
          arguments: [initTxb.object(cap), response.coinOut],
        });

        coinsOut = [unwrappedCoin];
      } else {
        coinsOut = [response.coinOut];
      }
    } else {
      const response = await clamm.removeLiquidity({
        lpCoin,
        txb: initTxb as any,
        pool: pool.poolObjectId,
      });
      txb = response.txb as unknown as TransactionBlock;
      if (isScallop) {
        coinsOut = [] as TransactionResult[];

        pool.coinTypes.forEach((x, index) => {
          const wrappedType = WRAPPED_CONVERSION_MAP[network][x];

          if (!wrappedType) {
            coinsOut.push(response.coinsOut[index]);
            return;
          }

          const cap = SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][wrappedType];

          if (!cap) {
            coinsOut.push(response.coinsOut[index]);
            return;
          }

          const unwrappedCoin = initTxb.moveCall({
            target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::burn`,
            typeArguments: [x, wrappedType],
            arguments: [initTxb.object(cap), response.coinsOut[index]],
          });

          coinsOut.push(unwrappedCoin);
        });
      } else {
        coinsOut = response.coinsOut;
      }
    }

    txb.transferObjects(coinsOut, txb.pure.address(currentAccount.address));

    return txb as TransactionBlock;
  };
};
