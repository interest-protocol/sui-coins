import { useSuiClient, useSuiClientContext } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/client';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import useSWR from 'swr';

import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata } from '@/utils';

export const useAssetsNFTs = (nfts: LinkAssets['nfts']) => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();

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
  const { network } = useSuiClientContext();
  const typeList = balances.map((x) => x.coinType);

  return useSWR<ReadonlyArray<CoinMetadataWithType>>(
    `coins-${network}-${typeList}`,
    () => {
      if (!balances) return [];

      return fetchCoinMetadata({ network, coinsType: typeList }).then(
        (response) => response.json?.()
      );
    }
  );
};
