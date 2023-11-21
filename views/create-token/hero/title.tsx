import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SuiLogoSVG } from '@/svg';

const Title: FC = () => (
  <Box display="flex" flexDirection="column" rowGap="l" mb="xl">
    <Box>
      <Typography
        mr="l"
        as="span"
        variant="body"
        size="small"
        fontWeight="400"
        lineHeight="4rem"
        fontFamily="Proto"
        fontStyle="normal"
        fontSize={['7xl', '7xl', '7xl', '9xl']}
      >
        Create coins on Sui Network
      </Typography>
      <Box as="span" display="inline-block" verticalAlign="bottom">
        <SuiLogoSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
      </Box>
    </Box>
    <Box
      fontWeight="500"
      fontStyle="normal"
      fontSize="1.375rem"
      lineHeight="1.75rem"
      fontFamily="Satoshi"
    >
      100% free, No setup, No coding required.
    </Box>
  </Box>
);

export default Title;
