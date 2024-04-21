import { Box, Typography } from '@interest-protocol/ui-kit';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';

import { PoolCardTokenInfoProps } from './pool-card.types';

const PoolCardInfo: FC<PoolCardTokenInfoProps> = ({
  coinMetadata,
  coinTypes,
}) => {
  const network = useNetwork();

  return (
    <Box>
      <Box
        my="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          mb="m"
          gap="m"
          display="flex"
          height="2.5rem"
          justifyContent="center"
          alignItems="center"
          alignSelf="stretch"
        >
          {coinTypes.map((type) => (
            <Box
              key={v4()}
              display="flex"
              width="2.5rem"
              bg="onSurface"
              color="surface"
              height="2.5rem"
              borderRadius="xs"
              alignItems="center"
              justifyContent="center"
            >
              <TokenIcon
                withBg
                type={type}
                network={network}
                symbol={coinMetadata[type].symbol}
              />
            </Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            size="small"
            variant="body"
            fontSize="1rem"
            fontWeight="700"
            lineHeight="1.7rem"
            color="onSurface"
          >
            {coinTypes.reduce(
              (acc, type) =>
                `${acc ? `${acc} • ` : ''}${pathOr(
                  '',
                  [type, 'symbol'],
                  coinMetadata
                ).replace('SUI', 'MOV')}`,
              ''
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolCardInfo;
