import { useSuiClient } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/dist/cjs/client';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { CoinMetadataWithType } from '@/interface';

export const useAssetsNFTs = (nfts: LinkAssets['nfts']) => {
  const network = useNetwork();
  const suiClient = useSuiClient();

  const idList = nfts.map(({ objectId }) => objectId).join();

  return useSWR<ReadonlyArray<SuiObjectResponse['data']>>(
    `nfts-${network}-${idList}`,
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
  const network = useNetwork();
  const typeList = balances.reduce(
    (acc, { coinType }) => (acc ? `${acc},${coinType}` : coinType),
    ''
  );

  return useSWR<ReadonlyArray<CoinMetadataWithType>>(
    `coins-${network}-${typeList}`,
    () => {
      if (!balances) return [];

      return fetch(
        encodeURI(
          `/api/v1/coin-metadata?network=${network}&type_list=${typeList}`
        )
      ).then((response) => response.json?.());
    }
  );
};
