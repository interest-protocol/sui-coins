import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { BATCH_SIZE } from './airdrop.constants';
import { IAirdropForm } from './airdrop.types';
import AirdropUploadStatusCard from './airdrop-upload-status-card';

const AirdropUploadStatus: FC = () => {
  const { control } = useFormContext<IAirdropForm>();

  const airdropList = useWatch({ control, name: 'airdropList' });
  const doneItems = useWatch({ control, name: 'done' });
  const failedItems = useWatch({ control, name: 'failed' });

  const error = useWatch({ control, name: 'error' });

  const allBatches = Math.ceil((airdropList?.length ?? 0) / BATCH_SIZE);

  return (
    <Box
      p="xl"
      gap="4xl"
      display="flex"
      borderRadius="m"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Typography variant="title" size="medium" color="onSurface">
        Progress Summary
      </Typography>
      <Box display="flex" gap="m" flexDirection="column-reverse">
        {Array.from({ length: allBatches }, (_, index) => (
          <AirdropUploadStatusCard
            key={v4()}
            index={index + 1}
            lastBatchSize={
              allBatches === index + 1
                ? (airdropList?.length || 0) % BATCH_SIZE
                : 0
            }
            status={
              error || failedItems.includes(index)
                ? 'failed'
                : doneItems.includes(index)
                  ? 'complete'
                  : 'pending'
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default AirdropUploadStatus;
