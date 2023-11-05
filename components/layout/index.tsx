import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    m="0 auto"
    display="flex"
    minHeight="100vh"
    variant="container"
    flexDirection="column"
  >
    <Header />
    <Box as="main" flex="1">
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
