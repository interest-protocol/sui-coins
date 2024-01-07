import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { LogoSVG } from '@/svg';

import { SidebarLogoProps } from './sidebar.types';

const SidebarLogo: FC<SidebarLogoProps> = ({ isCollapsed }) => (
  <Link href={Routes[RoutesEnum.CreateCoin]}>
    <Motion
      mb="3.75rem"
      display="flex"
      overflow="hidden"
      textAlign="center"
      alignItems="center"
      position="relative"
      transition={{ duration: 0.5 }}
      animation={isCollapsed ? '2.5rem' : 'auto'}
      variants={{
        collapsed: { width: '2.5rem ' },
        unCollapsed: { width: 'auto' },
      }}
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
    </Motion>
  </Link>
);

export default SidebarLogo;
