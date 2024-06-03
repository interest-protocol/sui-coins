import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { FixedPointMath } from '@/lib';
import { TimesSVG } from '@/svg';
import { getSymbolByType } from '@/utils';
import {
  useAssetsBalances,
  useAssetsNFTs,
} from '@/views/components/send-asset-details/send-asset-details.hooks';
import { getAmountsMap } from '@/views/components/send-asset-details/send-asset-details.utils';

const SendHistoryDetailsModal: FC<{
  closeModal: () => void;
  assets: LinkAssets;
}> = ({ closeModal, assets }) => {
  const { network } = useSuiClientContext();
  const amountsMap = getAmountsMap(assets.balances);

  const { data: nfts } = useAssetsNFTs(assets.nfts);
  const { data: coins } = useAssetsBalances(assets.balances);

  return (
    <Motion
      layout
      display="flex"
      bg="lowContainer"
      minWidth="22rem"
      maxHeight="90vh"
      maxWidth="25rem"
      minHeight="30rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        p="m"
        display="grid"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
        gridTemplateColumns="2rem auto 2rem"
      >
        <Box />
        <Typography variant="title" size="large">
          Assets in Link
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box
        p="l"
        gap="2xl"
        flex="1"
        display="flex"
        overflowY="auto"
        flexDirection="column"
      >
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
                type={type}
                symbol={symbol}
                network={network as Network}
              />
              <Typography variant="body" size="medium">
                {symbol}
              </Typography>
            </Box>
            <Typography size="medium" variant="body">
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
                  type={type}
                  loaderSize={12}
                  symbol={symbol}
                  network={network as Network}
                />
                <Typography variant="label" size="large">
                  {displayName || symbol || formatAddress(type)}
                </Typography>
              </Box>
              <Typography size="medium" variant="body">
                1
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box borderTop="1px solid" borderColor="outlineVariant">
        <Box
          px="m"
          m="l"
          display="flex"
          borderRadius="xs"
          bg="lowestContainer"
          flexDirection="column"
        >
          <Box
            py="s"
            display="flex"
            borderBottom="1px solid"
            borderColor="outlineVariant"
            justifyContent="space-between"
          >
            <Typography size="small" variant="body" color="disabled">
              Assets attached
            </Typography>
            <Typography size="small" variant="body" color="disabled">
              {assets?.nfts.length + assets?.balances.length}
            </Typography>
          </Box>
          <Box
            py="s"
            display="flex"
            borderBottom="1px solid"
            borderColor="outlineVariant"
            justifyContent="space-between"
          >
            <Typography size="small" variant="body" color="disabled">
              Coins
            </Typography>
            <Typography size="small" variant="body" color="disabled">
              {assets?.balances.length}
            </Typography>
          </Box>
          <Box py="s" display="flex" justifyContent="space-between">
            <Typography size="small" variant="body" color="disabled">
              Objects
            </Typography>
            <Typography size="small" variant="body" color="disabled">
              {assets?.nfts.length}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Motion>
  );
};

export default SendHistoryDetailsModal;
