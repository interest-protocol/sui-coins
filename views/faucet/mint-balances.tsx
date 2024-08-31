import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { FAUCET_COINS } from '@/constants/dca';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

const MintBalances: FC = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();

  return (
    <Box
      p="xl"
      mb="4xl"
      mx="auto"
      display="flex"
      borderRadius="xs"
      bg="lowestContainer"
      flexDirection="column"
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
        {FAUCET_COINS.map(({ symbol, type }) => (
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
                <TokenIcon
                  withBg
                  type={type}
                  symbol={symbol}
                  network={network}
                />
              </Box>
              <Typography variant="body" size="large" color="onSurface">
                {symbol}
              </Typography>
            </Box>
            <Typography variant="body" size="large" color="onSurface">
              {FixedPointMath.toNumber(
                coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
                coinsMap[type]?.decimals || 0
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MintBalances;
