import { Box } from 'elements';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      flexDirection="column"
      mixBlendMode="color-burn"
      justifyContent="space-between"
      background={`url('gradient.svg'), url('noice.svg')`}
      backgroundSize="cover"
    >
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
