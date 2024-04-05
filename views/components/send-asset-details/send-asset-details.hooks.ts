import { useSuiClient } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/dist/cjs/client';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import { useId } from 'react';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { CoinMetadataWithType } from '@/interface';

export const useAssetsNFTs = (nfts: LinkAssets['nfts']) => {
  const id = useId();
  const network = useNetwork();
  const suiClient = useSuiClient();

  return useSWR<ReadonlyArray<SuiObjectResponse['data']>>(
    `nfts-${network}-${id}`,
    () => {
      if (!nfts) return [];

      return Promise.all(
        nfts.map(({ objectId }) =>
          suiClient
            .getObject({
              id: objectId,
              options: { showDisplay: true, showType: true },
            })
            .then((object) => object.data)
        )
      );
    }
  );
};

export const useAssetsBalances = (balances: LinkAssets['balances']) => {
  const id = useId();
  const network = useNetwork();

  return useSWR<ReadonlyArray<CoinMetadataWithType>>(
    `coins-${network}-${id}`,
    () => {
      if (!balances) return [];

      return fetch(
        encodeURI(
          `/api/v1/coin-metadata?network=${network}&type_list=${balances.reduce(
            (acc, { coinType }) => `${acc},${coinType}`,
            ''
          )}`
        )
      ).then((response) => response.json?.());
    }
  );
};
