import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowLeftSVG } from '@/svg';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({
  name,
  onBack,
  centerTile,
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
    maxWidth="65rem"
    borderRadius="xs"
    alignItems="center"
    bg="container"
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
      ml={centerTile ? 'auto' : ''}
      fontSize={['xl', 'xl', '3xl', '5xl']}
    >
      {name}
    </Typography>
    {iconTokenList && (
      <Box
        gap="s"
        ml="auto"
        alignItems="center"
        display={['none', 'none', 'flex', 'flex']}
      >
        {iconTokenList.map((Icon) => (
          <Box
            key={v4()}
            bg="onSurface"
            display="flex"
            overflow="hidden"
            borderRadius="xs"
            alignItems="center"
            justifyContent="center"
            color="lowestContainer"
            width={['2rem', '2rem', '2rem', '2.5rem']}
            height={['2rem', '2rem', '2rem', '2.5rem']}
          >
            {typeof Icon === 'string' ? (
              <img src={Icon} alt="Token Icon" width="100%" />
            ) : (
              <Icon width="100%" maxWidth="60%" maxHeight="60%" />
            )}
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

export default PoolTitleBar;
