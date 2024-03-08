import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowLeftSVG } from '@/svg';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({
  name,
  onBack,
  isPageTitle,
  centerTile,
  iconTokenList,
}) => (
  <Box
    pb="m"
    pt={isPageTitle ? 'unset' : 'm'}
    px="xl"
    mb="xs"
    gap={['unset', 'm', 'm', 'm', 'm']}
    mx="auto"
    display="flex"
    flexWrap="wrap"
    maxWidth="65rem"
    flexDirection={[isPageTitle ? 'column' : 'row', 'row', 'row', 'row', 'row']}
    borderRadius="xs"
    alignItems={[
      isPageTitle ? 'unset' : 'center',
      'center',
      'center',
      'center',
      'center',
    ]}
    bg={isPageTitle ? 'transparent' : 'lowestContainer'}
    mt={['5xl', '5xl', '5xl', 'xl']}
    position="relative"
  >
    <Button
      isIcon
      mr="xs"
      variant="text"
      onClick={onBack}
      color="onSurface"
      nHover={{
        bg: isPageTitle ? 'lowestContainer' : 'surface',
      }}
      position={
        isPageTitle
          ? ['relative', 'absolute', 'absolute', 'absolute', 'absolute']
          : 'relative'
      }
      top={isPageTitle ? '0' : 'unset'}
    >
      <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
    </Button>
    <Typography
      size="large"
      color="onSurface"
      variant="headline"
      textAlign="center"
      ml={centerTile ? 'auto' : ''}
      mr={[
        isPageTitle ? 'auto' : 'unset',
        isPageTitle ? 'auto' : 'unset',
        'unset',
        'unset',
        'unset',
      ]}
      fontSize={['xl', 'xl', '3xl', '5xl']}
      dangerouslySetInnerHTML={{ __html: name }}
    />
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
