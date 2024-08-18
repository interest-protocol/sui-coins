import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import MenuMobile from '@/components/menu-mobile';
import Mint from '@/components/mint';
import Wallet from '@/components/wallet';
import { Routes, RoutesEnum } from '@/constants';
import { LogoSVG } from '@/svg';

import { HeaderProps } from './header.types';

const Header: FC<HeaderProps> = ({ withLogo }) => (
  <>
    <Box
      py="m"
      px="xl"
      top="0"
      gap="xs"
      left="0"
      right="0"
      zIndex="1"
      width="100%"
      position="relative"
      alignItems="center"
      borderBottom="1px solid"
      flexDirection="row-reverse"
      borderColor="outlineVariant"
      gridTemplateColumns="1fr 1fr"
      justifyContent="space-between"
      display={['none', 'none', 'none', 'flex']}
    >
      <Wallet />
      {withLogo && (
        <Link href={Routes[RoutesEnum.Swap]}>
          <Box
            display="flex"
            overflow="hidden"
            textAlign="center"
            alignItems="center"
          >
            <Box
              display="flex"
              minWidth="2.5rem"
              minHeight="2.5rem"
              alignItems="center"
              justifyContent="center"
            >
              <LogoSVG width="100%" maxWidth="2.5rem" maxHeight="2.5rem" />
            </Box>
            <Box ml="m">
              <Typography
                size="medium"
                variant="title"
                fontWeight="700"
                color="onSurface"
                width="max-content"
              >
                SUI COINS
              </Typography>
            </Box>
          </Box>
        </Link>
      )}
    </Box>
    <Box
      py="m"
      top="0"
      gap="xs"
      zIndex={3}
      width="100%"
      position="relative"
      alignItems="center"
      bg="lowestContainer"
      px={['m', 'l', 'l', 'xl']}
      justifyContent="space-between"
      gridTemplateColumns="1fr 1fr 1fr"
      display={['flex', 'flex', 'flex', 'none']}
      boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
    >
      <Link href={Routes[RoutesEnum.Swap]}>
        <Box display="flex" alignItems="center" height="1.5rem">
          <LogoSVG maxHeight="1.5rem" maxWidth="7.5rem" width="100%" />
        </Box>
      </Link>
      <Box position="relative" display="flex" gap="s" alignItems="center">
        <Mint />
        <Wallet />
        <MenuMobile />
      </Box>
    </Box>
  </>
);

export default Header;
