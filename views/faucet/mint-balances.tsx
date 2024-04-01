import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { COINS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

const MintBalances: FC = () => {
  const { coinsMap } = useWeb3();
  const { network } = useNetwork();

  return (
    <Box
      mb="4xl"
      mx="auto"
      display="flex"
      borderRadius="2rem"
      bg="container"
      flexDirection="column"
      p={['xl', 'xl', 'xl', '7xl']}
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Typography variant="body" size="large" color="onSurface">
        Balance minted
      </Typography>
      <Box
        p="m"
        mt="s"
        gap="m"
        bg="lowestContainer"
        display="flex"
        borderRadius="s"
        flexDirection="column"
      >
        {COINS.map(({ symbol, type }) => {
          const Icon = TOKEN_ICONS[network][symbol];
          return (
            <Box key={v4()} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap="l">
                <Box
                  display="flex"
                  bg="onSurface"
                  color="surface"
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius="xs"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
                </Box>
                <Typography variant="body" size="large" color="onSurface">
                  {symbol}
                </Typography>
              </Box>
              <Typography variant="body" size="large" color="onSurface">
                {FixedPointMath.toNumber(
                  coinsMap[type]?.balance
                    ? BigNumber(coinsMap[type]?.balance)
                    : ZERO_BIG_NUMBER,
                  coinsMap[type]?.decimals || 0
                )}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MintBalances;
