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
    py="m"
    px="xl"
    mb="xs"
    mx="auto"
    gap="1rem"
    display="flex"
    maxWidth="65rem"
    borderRadius="xs"
    alignItems="center"
    bg="lowestContainer"
    mt={['5xl', '5xl', '5xl', 'xl']}
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
          borderRadius="xs"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
          color="lowestContainer"
        >
          {typeof Icon === 'string' ? (
            <img src={Icon} alt="Token Icon" width="100%" />
          ) : (
            <Icon width="100%" maxWidth="1.6rem" maxHeight="1.6rem" />
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default PoolTitleBar;
