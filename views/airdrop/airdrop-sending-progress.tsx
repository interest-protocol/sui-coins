import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { AirdropSendingProgressProps } from './airdrop.types';

const AirdropSendingProgress: FC<AirdropSendingProgressProps> = ({
  title,
  loadingProgress,
  description,
}) => (
  <Box
    gap="s"
    my="4xl"
    mx="auto"
    mb="10xl"
    width="100%"
    display="flex"
    maxWidth="39.5rem"
    color="onSurface"
    bg="lowContainer"
    borderRadius="xs"
    flexDirection="column"
    boxShadow="dropShadow.2xl"
  >
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography size="medium" variant="headline" m="m">
        {title}
      </Typography>
      <Box m="m">
        <ProgressIndicator
          size={80}
          value={loadingProgress}
          variant="loading"
        />
      </Box>
      <Box width="22rem" height="4.5rem" p="s" my="l" textAlign="center">
        <Typography size="medium" variant="body">
          {description}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default AirdropSendingProgress;
