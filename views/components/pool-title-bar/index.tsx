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
    py="m"
    gap="m"
    px="xl"
    display="flex"
    alignItems="center"
    borderRadius="xs"
    bg="lowestContainer"
    mb={['5xl', '5xl', '5xl', 'xs']}
  >
    <Button isIcon variant="text" mr="xs" onClick={onBack}>
      <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
    </Button>
    <Typography
      size="large"
      variant="headline"
      textAlign="center"
      fontSize={['3xl', '3xl', '5xl', '5xl']}
    >
      {name}
    </Typography>
    <Box
      ml="auto"
      gap="m"
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
