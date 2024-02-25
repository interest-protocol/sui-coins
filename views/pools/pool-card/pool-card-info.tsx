import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';
import { DefaultTokenSVG } from '@/svg';

import { PoolCardTokenInfoProps } from './pool-card.types';

const PoolCardInfo: FC<PoolCardTokenInfoProps> = ({ coins, apr }) => {
  const { network } = useNetwork();

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
          {coins.map(({ symbol }) => {
            const Icon = TOKEN_ICONS[network][symbol] ?? DefaultTokenSVG;

            return (
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
                <Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Box>
            );
          })}
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
            {coins.map(({ symbol }, index) => `${index ? ' • ' : ''}${symbol}`)}
          </Typography>
          <Typography
            textAlign="center"
            textTransform="uppercase"
            size="large"
            variant="label"
            color="primary"
          >
            {apr}% APR
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolCardInfo;
