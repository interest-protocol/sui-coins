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
import { AirdropProgressIndicatorProps, IAirdropForm } from './airdrop.types';

const AirdropProgressIndicator: FC<AirdropProgressIndicatorProps> = ({
  goBack,
}) => {
  const { control } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const doneItems = useWatch({ control, name: 'done' });
  const failedItems = useWatch({ control, name: 'failed' });
  const error = useWatch({ control, name: 'error' });

  const allBatches = Math.ceil((airdropList?.length ?? 0) / BATCH_SIZE);
  const finished = Math.round(
    ((doneItems.length + failedItems.length) / allBatches) * 100
  );

  const isError = error || (finished && failedItems.length);

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
        color={isError ? 'error' : finished !== 100 ? 'onSurface' : 'success'}
      >
        {isError
          ? 'error found'
          : finished !== 100
          ? 'Sending'
          : 'You are done'}
      </Typography>
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        {isError ? (
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
        ) : finished !== 100 ? (
          <>
            <ProgressIndicator variant="loading" size={200} />
            <Typography variant="title" size="large" position="absolute">
              {finished}%
            </Typography>
          </>
        ) : (
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
        )}
      </Box>
      <Typography
        mx="auto"
        size="medium"
        variant="body"
        maxWidth="20rem"
        textAlign="center"
      >
        {error || finished !== 100
          ? 'Sending batches'
          : doneItems.length === allBatches
          ? 'The airdrop has been sent'
          : `${failedItems.length} batches was not sent`}
      </Typography>
      {(error || finished === 100) && (
        <Button
          variant="filled"
          onClick={goBack}
          justifyContent="center"
          bg={error || failedItems.length ? 'error' : 'primary'}
          color={error || failedItems.length ? 'onError' : 'onPrimary'}
        >
          Go back
        </Button>
      )}
    </Box>
  );
};

export default AirdropProgressIndicator;
