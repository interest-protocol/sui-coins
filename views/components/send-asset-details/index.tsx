import { Box, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui/utils';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { FixedPointMath } from '@/lib';
import { getSymbolByType } from '@/utils';

import { useAssetsBalances, useAssetsNFTs } from './send-asset-details.hooks';
import { SendAssetDetailsProps } from './send-asset-details.types';
import { getAmountsMap } from './send-asset-details.utils';

const SendAssetDetails: FC<SendAssetDetailsProps> = ({ assets, network }) => {
  const amountsMap = getAmountsMap(assets.balances);

  const { data: nfts } = useAssetsNFTs(assets.nfts);
  const { data: coins } = useAssetsBalances(assets.balances);

  return (
    <Box px="2xl" py="l" display="flex" gap="s" flexDirection="column">
      {coins?.map(({ type, symbol, decimals }) => (
        <Box
          key={v4()}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box gap="s" display="flex" alignItems="center">
            <TokenIcon
              withBg
              size="1rem"
              type={type}
              symbol={symbol}
              network={network}
            />
            <Typography variant="body" size="medium">
              {symbol}
            </Typography>
          </Box>
          <Typography
            px="s"
            py="xs"
            size="medium"
            variant="body"
            bg="container"
            borderRadius="xs"
          >
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
          <Box
            key={v4()}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box gap="s" display="flex" alignItems="center">
              <TokenIcon
                withBg
                url={url}
                size="1rem"
                type={type}
                loaderSize={12}
                symbol={symbol}
                network={network}
              />
              <Typography variant="label" size="large">
                {displayName || symbol || formatAddress(type)}
              </Typography>
            </Box>
            <Typography
              px="s"
              py="xs"
              size="medium"
              bg="container"
              variant="body"
              borderRadius="xs"
            >
              1
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SendAssetDetails;
