import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import AirdropUploadStatusCard from './airdrop-upload-status-card';

const AirdropUploadStatus: FC = () => (
  <Box
    p="xl"
    gap="4xl"
    display="flex"
    borderRadius="m"
    bg="lowestContainer"
    flexDirection="column"
  >
    <Typography variant="title" size="medium">
      Progress Summary
    </Typography>
    <Box display="flex" gap="m" flexDirection="column">
      {Array.from({ length: 10 }, (_, index) => (
        <AirdropUploadStatusCard
          key={v4()}
          index={index}
          status={index < 5 ? 'complete' : index == 6 ? 'failed' : 'pending'}
        />
      ))}
    </Box>
  </Box>
);

export default AirdropUploadStatus;
