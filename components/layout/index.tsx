import { Box } from 'elements';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      background={`url('gradient.svg'), url('noice.svg')`}
      backgroundSize="cover"
      mixBlendMode="color-burn"
    >
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
