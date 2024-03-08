import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const FetchingToken: FC = () => (
  <Box
    p="4xl"
    gap="xl"
    flex="1"
    height="100%"
    display="flex"
    overflowY="auto"
    bg="lowContainer"
    color="onSurface"
    alignItems="center"
    flexDirection="column"
  >
    <ProgressIndicator variant="loading" />
    <Typography variant="body" size="medium">
      Loading...
    </Typography>
  </Box>
);

export default FetchingToken;
