import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SuiLogoSVG } from '@/svg';

const Title: FC = () => (
  <Box display="flex" flexDirection="column" rowGap="l" mb="xl">
    <Box>
      <Box
        mr="l"
        as="span"
        fontWeight="400"
        lineHeight="4rem"
        fontFamily="Proto"
        fontStyle="normal"
        fontSize={['2.8125rem', '2.8125rem', '2.8125rem', '3.5625rem']}
      >
        Create coins on Sui Network
      </Box>
      <SuiLogoSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
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
