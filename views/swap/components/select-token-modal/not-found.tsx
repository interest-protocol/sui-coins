import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { NoSearchSVG } from '@/svg';

const NotFound: FC = () => (
  <Box
    p="4xl"
    gap="xl"
    flex="1"
    color="text"
    display="flex"
    overflowY="auto"
    alignItems="center"
    flexDirection="column"
    bg="lowContainer"
  >
    <NoSearchSVG maxHeight="4rem" maxWidth="4rem" width="100%" />
    <Typography variant="body" size="medium" textTransform="capitalize">
      Not Found
    </Typography>
  </Box>
);

export default NotFound;
