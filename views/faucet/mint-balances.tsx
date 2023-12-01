import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { COINS } from '@/constants/coins';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

const MintBalances: FC = () => {
  const { coinsMap } = useWeb3();

  return (
    <Box
      mb="4xl"
      mx="auto"
      display="flex"
      borderRadius="2rem"
      bg="lowestContainer"
      flexDirection="column"
      p={['xl', 'xl', 'xl', '7xl']}
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Typography variant="body" size="large">
        Balance minted
      </Typography>
      <Box
        p="m"
        mt="s"
        gap="m"
        bg="surface"
        display="flex"
        borderRadius="s"
        flexDirection="column"
      >
        {COINS.map(({ symbol, type }) => {
          const Icon = TOKEN_ICONS[symbol];
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
                <Typography variant="body" size="large">
                  {symbol}
                </Typography>
              </Box>
              <Typography variant="body" size="large">
                {FixedPointMath.toNumber(
                  coinsMap[type]?.totalBalance || ZERO_BIG_NUMBER,
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
