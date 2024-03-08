import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { MOVSVG } from '@/svg';

const Title: FC = () => (
  <Box display="flex" flexDirection="column" rowGap="l" mb="xl">
    <Box>
      <Typography mr="l" as="span" variant="display" size="large">
        Create coins on M2 Network
      </Typography>
      <Box as="span" display="inline-block" verticalAlign="bottom">
        <MOVSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
      </Box>
    </Box>
    <Typography variant="title" size="large">
      100% free, No setup, No coding required.
    </Typography>
  </Box>
);

export default Title;
