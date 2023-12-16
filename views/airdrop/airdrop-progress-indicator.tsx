import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CheckSVG, WarningSVG } from '@/svg';

import { BATCH_SIZE } from './airdrop.constants';
import { IAirdropForm } from './airdrop.types';

const AirdropProgressIndicator: FC<{ goBack: () => void }> = ({ goBack }) => {
  const { control } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const doneItems = useWatch({ control, name: 'done' });
  const failedItems = useWatch({ control, name: 'failed' });

  const allBatches = Math.ceil((airdropList?.length ?? 0) / BATCH_SIZE);
  const finished = Math.round(
    ((doneItems.length + failedItems.length) / allBatches) * 100
  );

  return (
    <Box
      p="xl"
      gap="4xl"
      display="flex"
      borderRadius="m"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Typography
        variant="headline"
        size="large"
        textAlign="center"
        color={
          finished !== 100
            ? 'onSurface'
            : doneItems.length === allBatches
            ? 'success'
            : 'error'
        }
      >
        {finished !== 100
          ? 'Sending'
          : doneItems.length === allBatches
          ? "You're done"
          : 'error found'}
      </Typography>
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        {finished !== 100 ? (
          <>
            <ProgressIndicator variant="loading" size={200} />
            <Typography variant="title" size="large" position="absolute">
              {finished}%
            </Typography>
          </>
        ) : doneItems.length === allBatches ? (
          <Box
            display="flex"
            width="8.75rem"
            height="8.75rem"
            color="success"
            borderRadius="full"
            alignItems="center"
            bg="successContainer"
            justifyContent="center"
          >
            <CheckSVG
              width="100%"
              maxWidth="3.43225rem"
              maxHeight="2.52081rem"
            />
          </Box>
        ) : (
          <Box
            color="error"
            display="flex"
            width="8.75rem"
            height="8.75rem"
            borderRadius="full"
            alignItems="center"
            bg="errorContainer"
            justifyContent="center"
          >
            <WarningSVG
              width="100%"
              maxWidth="3.96831rem"
              maxHeight="3.73075rem"
            />
          </Box>
        )}
      </Box>
      <Typography
        mx="auto"
        size="medium"
        variant="body"
        maxWidth="20rem"
        textAlign="center"
      >
        {finished !== 100
          ? 'Sending batches'
          : doneItems.length === allBatches
          ? 'The airdrop has been sent'
          : `${failedItems.length} batches was not sended`}
      </Typography>
      {finished === 100 && (
        <Button
          variant="filled"
          onClick={goBack}
          justifyContent="center"
          bg={failedItems.length ? 'error' : 'primary'}
          color={failedItems.length ? 'onError' : 'onPrimary'}
        >
          Go back
        </Button>
      )}
    </Box>
  );
};

export default AirdropProgressIndicator;
