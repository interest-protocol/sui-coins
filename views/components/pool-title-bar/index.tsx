import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowLeftSVG } from '@/svg';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({
  name,
  onBack,
  iconTokenList,
}) => (
  <Box
    mx="auto"
    py="1rem"
    gap="1rem"
    px="1.5rem"
    display="flex"
    maxWidth="65rem"
    alignItems="center"
    borderRadius="2rem"
    bg="lowestContainer"
    my={['5xl', '5xl', '5xl', '8xl']}
  >
    <Button isIcon variant="text" mr="0.5rem" onClick={onBack}>
      <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
    </Button>
    <Typography
      size="large"
      variant="headline"
      textAlign="center"
      fontSize={['1.5rem', '1.5rem', '2rem', '2rem']}
    >
      {name}
    </Typography>
    <Box
      ml="auto"
      gap="1rem"
      alignItems="center"
      display={['none', 'none', 'flex', 'flex']}
    >
      {iconTokenList.map((Icon) => (
        <Box
          bg="#000"
          key={v4()}
          display="flex"
          width="2.5rem"
          height="2.5rem"
          alignItems="center"
          borderRadius="0.5rem"
          justifyContent="center"
          color="lowestContainer"
        >
          <Icon width="100%" maxWidth="1.6rem" maxHeight="1.6rem" />
        </Box>
      ))}
    </Box>
  </Box>
);

export default PoolTitleBar;
