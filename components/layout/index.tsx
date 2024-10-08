import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

import { ModalProvider } from '@/context/modal';
import { useNetwork } from '@/hooks/use-network';
import FloatingButtons from '@/views/components/floating-buttons';
import ErrorPage from '@/views/error';

import Web3Manager from '../web3-manager';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';
import Sidebar from './sidebar';
import { existThisRouteInNetwork } from './sidebar/sidebar.utils';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
  features,
  noSidebar,
}) => {
  const network = useNetwork();
  const { pathname } = useRouter();

  return (
    <ModalProvider>
      <Box bg="surface" display="flex" height="100vh" overflow="hidden">
        {!noSidebar && <Sidebar />}
        <Box
          flex="1"
          as="aside"
          height="100vh"
          display="flex"
          position="relative"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Header />
          <Web3Manager features={features} />
          <Box
            flex="1"
            width="100%"
            display="flex"
            overflowY="auto"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              m="0"
              width="100%"
              display="flex"
              variant="container"
              flexDirection="column"
              px={['m', 'l', 'l', 'xl']}
              mt="unset"
            >
              <Box as="main" flex="1" mb="2xl">
                <Box>
                  {title && (
                    <Typography
                      textAlign="center"
                      color="onSurface"
                      variant="display"
                      size="medium"
                      my="3rem"
                    >
                      {title}
                    </Typography>
                  )}
                  {!existThisRouteInNetwork(pathname, network) ? (
                    <ErrorPage message="Something went wrong - Try switch network" />
                  ) : (
                    children
                  )}
                </Box>
              </Box>
            </Box>
            <FloatingButtons />
            <Footer />
          </Box>
        </Box>
      </Box>
    </ModalProvider>
  );
};
export default Layout;
