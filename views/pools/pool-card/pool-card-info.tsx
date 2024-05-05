import { Box, Typography } from '@interest-protocol/ui-kit';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';

import { PoolCardTokenInfoProps } from './pool-card.types';

const PoolCardInfo: FC<PoolCardTokenInfoProps> = ({
  coinTypes,
  coinMetadata,
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
            <TokenIcon
              withBg
              key={v4()}
              type={type}
              network={network}
              symbol={coinMetadata[type].symbol}
            />
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
