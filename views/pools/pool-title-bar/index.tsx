import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowLeftSVG } from '@/svg';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({
  poolName,
  poolExitCoin,
  poolEnterCoin,
}) => {
  return (
    <Box variant="container">
      <Box
        py="1rem"
        gap="1rem"
        px="1.5rem"
        width="100%"
        display="flex"
        alignItems="center"
        borderRadius="2rem"
        bg="lowestContainer"
        gridColumn={['1/12', '1/12', '2/12', '2/12']}
      >
        <Button isIcon variant="text" mr="0.5rem">
          <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
        </Button>
        <Typography variant="headline" size="large" textAlign="center">
          {poolName}
        </Typography>
        <Box ml="auto" gap="1rem" display="flex" alignItems="center">
          <Box width="2.5rem" height="2.5rem">
            {poolExitCoin}
          </Box>
          <Box width="2.5rem" height="2.5rem">
            {poolEnterCoin}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolTitleBar;
