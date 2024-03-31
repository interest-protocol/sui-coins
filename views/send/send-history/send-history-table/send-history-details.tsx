import { Box, Typography } from '@interest-protocol/ui-kit';
import { useSuiClient } from '@mysten/dapp-kit';
import type { SuiObjectResponse } from '@mysten/sui.js/dist/cjs/client';
import { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import { FC } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { getSymbolByType } from '@/utils';

import { getAmountsMap } from './send-history-table.utils';

const SendHistoryDetails: FC<{
  network: Network;
  assets: LinkAssets;
}> = ({ assets, network }) => {
  const suiClient = useSuiClient();
  const amountsMap = getAmountsMap(assets.balances);

  const { data: coins } = useSWR<ReadonlyArray<CoinMetadataWithType>>(
    `coins-${network}-${assets.balances}`,
    () => {
      if (!assets.balances) return [];

      return fetch(
        encodeURI(
          `/api/v1/coin-metadata?network=${network}&type_list=${assets.balances.reduce(
            (acc, { coinType }) => `${acc},${coinType}`,
            ''
          )}`
        )
      ).then((response) => response.json?.());
    }
  );

  const { data: nfts } = useSWR<ReadonlyArray<SuiObjectResponse['data']>>(
    `nfts-${network}-${assets.nfts}`,
    () => {
      if (!assets.nfts) return [];

      return Promise.all(
        assets.nfts.map(({ objectId }) =>
          suiClient
            .getObject({ id: objectId, options: { showDisplay: true } })
            .then((object) => object.data)
        )
      );
    }
  );

  return (
    <Box px="2xl" py="l" display="flex" gap="s">
      {coins?.map(({ type, symbol, decimals }) => (
        <Box key={v4()} display="flex" alignItems="center" gap="s">
          <TokenIcon
            withBg
            size="1rem"
            type={type}
            symbol={symbol}
            network={network}
          />
          <Typography variant="label" size="large">
            {symbol}
          </Typography>
          <Typography variant="label" size="large">
            {FixedPointMath.toNumber(amountsMap[type], decimals)}
          </Typography>
        </Box>
      ))}
      {nfts?.map((object) => {
        const type = object?.type ?? '';
        const symbol = getSymbolByType(type);
        const display = object?.display?.data;
        const displayName = display?.name;

        const url = display?.image_url || '';

        return (
          <Box key={v4()} display="flex" alignItems="center" gap="s">
            <TokenIcon
              withBg
              size="1rem"
              loaderSize={12}
              symbol={symbol}
              network={network}
              {...(url ? { url } : { network, type })}
            />
            <Typography variant="label" size="large">
              1 {displayName ?? symbol ?? type}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SendHistoryDetails;
