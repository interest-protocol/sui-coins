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
    gap="m"
    mx="auto"
    display="flex"
    flexWrap="wrap"
    bg="container"
    maxWidth="65rem"
    borderRadius="xs"
    alignItems="center"
    mt={['5xl', '5xl', '5xl', 'xl']}
  >
    <Button
      isIcon
      mr="xs"
      variant="text"
      onClick={onBack}
      color="onSurface"
      nHover={{
        bg: 'surface',
      }}
    >
      <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
    </Button>
    <Typography
      size="large"
      color="onSurface"
      variant="headline"
      textAlign="center"
      fontSize={['xl', 'xl', '3xl', '5xl']}
    >
      {name}
    </Typography>
    <Box
      gap="s"
      ml="auto"
      alignItems="center"
      display={['none', 'none', 'flex', 'flex']}
    >
      {iconTokenList.map((Icon) => (
        <Box
          bg="onSurface"
          key={v4()}
          display="flex"
          width={['2rem', '2rem', '2rem', '2.5rem']}
          height={['2rem', '2rem', '2rem', '2.5rem']}
          borderRadius="xs"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
          color="lowestContainer"
        >
          {typeof Icon === 'string' ? (
            <img src={Icon} alt="Token Icon" width="100%" />
          ) : (
            <Icon width="100%" maxWidth="60%" maxHeight="60%" />
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default PoolTitleBar;
