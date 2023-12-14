import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { BATCH_SIZE } from './airdrop.constants';
import { IAirdropForm } from './airdrop.types';

const AirdropProgressIndicator: FC = () => {
  const { control } = useFormContext<IAirdropForm>();

  const airdropList = useWatch({ control, name: 'airdropList' });
  const doneItems = useWatch({ control, name: 'done' });
  const failedItems = useWatch({ control, name: 'failed' });

  const allBatches = Math.ceil((airdropList?.length ?? 0) / BATCH_SIZE);
  const finished = ((doneItems.length + failedItems.length) / allBatches) * 100;

  return (
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
        <ProgressIndicator variant="circle" value={finished} size={200} />
        <Typography variant="title" size="large" position="absolute">
          {finished}%
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
};

export default AirdropProgressIndicator;
