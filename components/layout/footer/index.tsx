import { Box } from '@interest-protocol/ui-kit';
import { Typography } from 'elements';
import { FC } from 'react';

import { HeartSVG, IPXSVG } from '@/svg';

const Footer: FC = () => (
  <Box textTransform="uppercase" display="flex" flexDirection="column">
    <Box textAlign="center" mb="3rem" fontSize="0.875rem" fontFamily="Proto">
      <Typography fontFamily="inherit">The website is maintained &</Typography>
      <Typography
        gap="0.25rem"
        display="flex"
        fontFamily="inherit"
        justifyContent="center"
      >
        Made with
        <HeartSVG maxHeight="1.125rem" maxWidth="1.125rem" width="100%" />
        By Interest Protocol
      </Typography>
    </Box>
    <Box
      py="1rem"
      display="flex"
      borderTop="1px solid"
      borderColor="#C6C6CA"
      justifyContent="center"
    >
      <IPXSVG maxHeight="2.5rem" maxWidth="2.5rem" width="100%" />
    </Box>
  </Box>
);

export default Footer;
