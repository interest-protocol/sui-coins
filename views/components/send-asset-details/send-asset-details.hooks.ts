import { useSuiClient } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui/client';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import useSWR from 'swr';

import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata } from '@/utils';

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
  const typeList = balances.map(({ coinType }) => coinType);

  return useSWR<ReadonlyArray<CoinMetadataWithType>>(
    `coins-${network}-${typeList}`,
    () => {
      if (!balances.length) return [];

      return fetchCoinMetadata({ network, types: typeList }) as Promise<
        ReadonlyArray<CoinMetadataWithType>
      >;
    }
  );
};
