import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Routes, RoutesEnum } from '@/constants';
import { CheckSVG, WarningSVG } from '@/svg';

import { BATCH_SIZE } from './airdrop.constants';
import { AirdropProgressIndicatorProps, IAirdropForm } from './airdrop.types';

const AirdropProgressIndicator: FC<AirdropProgressIndicatorProps> = ({
  goBack,
}) => {
  const { push } = useRouter();
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
      bg="container"
      display="flex"
      borderRadius="m"
      flexDirection="column"
    >
      <Typography
        size="large"
        variant="headline"
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
        {isError
          ? `Batches were not sent`
          : finished !== 100
            ? 'Sending batches'
            : 'The airdrop has been sent'}
      </Typography>
      <Box display="flex" gap="s">
        {error && (
          <Button
            variant="outline"
            onClick={goBack}
            justifyContent="center"
            borderRadius="xs"
            borderColor="outlineVariant"
            nHover={{
              borderColor: 'error',
              color: 'error',
            }}
          >
            Close
          </Button>
        )}
        {error && (
          <Button
            flex="1"
            bg="error"
            color="onError"
            variant="filled"
            onClick={goBack}
            borderRadius="xs"
            justifyContent="center"
          >
            {error ? 'Resend Failed batches' : 'Got it'}
          </Button>
        )}
        {finished === 100 && (
          <>
            <Button
              flex="1"
              onClick={goBack}
              variant="outline"
              borderRadius="xs"
              justifyContent="center"
            >
              Got it
            </Button>
            <Button
              flex="1"
              variant="filled"
              borderRadius="xs"
              justifyContent="center"
              onClick={() => push(Routes[RoutesEnum.PoolCreate])}
            >
              Create Pool
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AirdropProgressIndicator;
