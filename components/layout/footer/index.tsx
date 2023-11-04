import { Box, Typography } from 'elements';
import { FC } from 'react';

import { HeartSVG, LogoSVG } from '@/svg';

const Footer: FC = () => (
  <Box
    mx="auto"
    pt="4rem"
    width="95%"
    pb="1.5rem"
    px="0.75rem"
    textTransform="uppercase"
  >
    <Box textAlign="center" mb="3rem" fontSize="0.875rem">
      <Typography>The website is maineted &</Typography>
      <Typography display="flex" justifyContent="center" gap="0.25rem">
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
      <Box>
        <LogoSVG maxHeight="2.5rem" maxWidth="2.5rem" width="100%" />
      </Box>
    </Box>
  </Box>
);

export default Footer;
