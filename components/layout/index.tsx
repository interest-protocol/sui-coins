import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box display="flex" height="100vh" overflow="hidden" bg="#F8F9FD">
    <Sidebar />
    <Box as="aside" position="relative" flex="1">
      <Header />
      <Box width="100%" overflowY="auto">
        <Box
          m="0"
          mt="8xl"
          width="100%"
          height="100vh"
          display="flex"
          variant="container"
          p={['m', 'l', 'xl']}
          flexDirection="column"
        >
          <Box as="main" flex="1" mb="10xl">
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Layout;
