import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    pt="xl"
    display="flex"
    height="100vh"
    overflow="hidden"
    position="relative"
    flexDirection="column"
    background="0% 100% url('/images/gradient.webp'), linear-gradient(0deg, #FFFB, #FFFB), url('/images/noise.webp')"
    backgroundSize="cover"
  >
    <Header />
    <Box width="100%" overflowY="auto">
      <Box
        m="0"
        p={['l', 'l', 'l', 'xl']}
        width="100%"
        height="100vh"
        display="flex"
        variant="container"
        flexDirection="column"
        mt={['8xl', '8xl', '8xl', '0']}
      >
        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  </Box>
);

export default Layout;
