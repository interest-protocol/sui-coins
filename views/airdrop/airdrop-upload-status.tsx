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

  return (
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
      <Box display="flex" gap="m" flexDirection="column-reverse">
        {Array.from(
          { length: Math.ceil((airdropList?.length ?? 0) / BATCH_SIZE) },
          (_, index) => (
            <AirdropUploadStatusCard
              key={v4()}
              index={index + 1}
              status={
                doneItems.includes(index)
                  ? 'complete'
                  : failedItems.includes(index)
                    ? 'failed'
                    : 'pending'
              }
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default AirdropUploadStatus;
