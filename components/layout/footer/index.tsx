import { Box, Typography } from 'elements';
import { FC } from 'react';

import { HeartSVG, LogoSVG } from '@/svg';

const Footer: FC = () => (
  <Box
    pt="4rem"
    px="0.75rem"
    pb="1.5rem"
    textTransform="uppercase"
    mx="auto"
    width="95%"
  >
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
      display="flex"
      justifyContent="center"
      py="1rem"
      borderTop="1px solid"
      borderColor="#C6C6CA"
    >
      <Box>
        <LogoSVG maxHeight="2.5rem" maxWidth="2.5rem" width="100%" />
      </Box>
    </Box>
  </Box>
);

export default Footer;
