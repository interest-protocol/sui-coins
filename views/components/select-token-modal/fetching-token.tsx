import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const FetchingToken: FC = () => {
  return (
    <Box
      p="4xl"
      gap="xl"
      flex="1"
      color="text"
      display="flex"
      overflowY="auto"
      alignItems="center"
      flexDirection="column"
      bg="surface.containerLow"
    >
      <ProgressIndicator variant="loading" />
      <Typography variant="body" size="medium" textTransform="capitalize">
        Loading...
      </Typography>
    </Box>
  );
};

export default FetchingToken;
