import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    display="flex"
    minHeight="100vh"
    position="relative"
    mixBlendMode="color-burn"
    background="0% 100% url('/images/gradient.webp'), linear-gradient(0deg, #FFFB, #FFFB), url('/images/noise.webp')"
    backgroundSize="cover"
  >
    <Box
      width="100%"
      display="flex"
      variant="container"
      flexDirection="column"
      pt={['4rem', 'unset']}
    >
      <Header />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
