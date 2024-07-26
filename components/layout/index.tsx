import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { ModalProvider } from '@/context/modal';
import MergeCoins from '@/views/components/merge-coins';

import Web3Manager from '../web3-manager';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';
import Sidebar from './sidebar';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
  features,
  noSidebar,
  withBlocked,
}) => (
  <ModalProvider>
    <Box display="flex" height="100vh" overflow="hidden" bg="surface">
      {!noSidebar && <Sidebar />}
      <Box
        flex="1"
        as="aside"
        display="flex"
        overflowY="auto"
        overflowX="hidden"
        position="relative"
        flexDirection="column"
      >
        <Header withLogo={noSidebar} />
        <Web3Manager features={features} withBlocked={withBlocked} />
        <Box
          m="0"
          mt="unset"
          width="100%"
          height="100%"
          display="flex"
          variant="container"
          flexDirection="column"
          px={['m', 'l', 'l', 'xl']}
          justifyContent="space-between"
        >
          <Box as="main" flex="1" mb="10xl">
            <Box>
              {title && (
                <Typography
                  textAlign="center"
                  variant="display"
                  size="medium"
                  my="3rem"
                >
                  {title}
                </Typography>
              )}
              {children}
            </Box>
          </Box>
          <MergeCoins />
          <Footer />
        </Box>
      </Box>
    </Box>
  </ModalProvider>
);

export default Layout;
