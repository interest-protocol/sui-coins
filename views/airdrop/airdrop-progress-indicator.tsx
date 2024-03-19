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
      color="onSurface"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Typography
        variant="headline"
        size="large"
        textAlign="center"
        color={isError ? 'error' : finished !== 100 ? 'onSurface' : 'success'}
      >
        {isError ? 'error found' : finished !== 100 ? 'Sending' : "You're done"}
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
            <Typography
              variant="title"
              size="large"
              position="absolute"
              color="onSurface"
            >
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
        color="onSurface"
      >
        {error || finished !== 100
          ? "This is the loading description. It can be anything you want and as long as you want. But please don't make it too long."
          : doneItems.length === allBatches
            ? 'The airdrop has been sent'
            : `${failedItems.length} batches was not sent`}
      </Typography>
      {(error || finished === 100) && (
        <Box
          pt="xl"
          display="flex"
          minWidth="100%"
          justifyContent="space-between"
          flexDirection="row"
        >
          <Button
            flex="1"
            marginRight="s"
            borderRadius="xs"
            variant="outline"
            onClick={goBack}
            justifyContent="center"
            borderColor="outlineVariant"
            bg={error || failedItems.length ? 'error' : 'surface'}
            color={error || failedItems.length ? 'onError' : 'onSurface'}
          >
            Close
          </Button>
          <Button
            flex="3"
            variant="filled"
            onClick={goBack}
            borderRadius="xs"
            justifyContent="center"
            bg={error || failedItems.length ? 'error' : 'surface'}
            color={error || failedItems.length ? 'onError' : 'onSurface'}
          >
            Go back
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AirdropProgressIndicator;
