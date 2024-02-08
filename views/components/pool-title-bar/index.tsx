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
    gap="1rem"
    px="xl"
    display="flex"
    maxWidth="65rem"
    alignItems="center"
    bg="lowestContainer"
    borderRadius="xs"
    mt={['5xl', '5xl', '5xl', 'xl']}
    width={['100%', '100%', '100%', '85%']}
    mb="xs"
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
          borderRadius="xs"
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
