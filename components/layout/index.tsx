import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import ErrorBoundary from '../error-boundary';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';
import Sidebar from './sidebar';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ title, children }) => (
  <ErrorBoundary>
    <Box bg="surface" display="flex" height="100vh" overflow="hidden">
      <Sidebar />
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
                {children}
              </Box>
            </Box>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  </ErrorBoundary>
);

export default Layout;
