import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    display="flex"
    minHeight="100vh"
    mixBlendMode="color-burn"
    background="url('/images/gradient.webp'), url('/images/noice.webp')"
    backgroundSize="cover"
  >
    <Box width="100%" display="flex" variant="container" flexDirection="column">
      <Header />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
