import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const AirdropProgressIndicator: FC = () => (
  <Box
    p="xl"
    gap="4xl"
    display="flex"
    borderRadius="m"
    bg="lowestContainer"
    flexDirection="column"
  >
    <Typography variant="headline" size="large" textAlign="center">
      Sending
    </Typography>
    <Box
      display="flex"
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <ProgressIndicator variant="circle" value={52} size={200} />
      <Typography variant="title" size="large" position="absolute">
        52%
      </Typography>
    </Box>
    <Typography
      mx="auto"
      size="medium"
      variant="body"
      maxWidth="20rem"
      textAlign="center"
    >
      This is the loading description. It can be anything you want and as long
      as you want. But please {"don't"} make it too long.
    </Typography>
  </Box>
);

export default AirdropProgressIndicator;
