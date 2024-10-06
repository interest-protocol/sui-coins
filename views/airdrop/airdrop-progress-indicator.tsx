import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { CheckSVG, LogoSVG, ShiftRightSVG, WarningSVG } from '@/svg';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import { BATCH_SIZE } from './airdrop.constants';
import { AirdropProgressIndicatorProps, IAirdropForm } from './airdrop.types';

const AirdropProgressIndicator: FC<AirdropProgressIndicatorProps> = ({
  goBack,
}) => {
  const { control, getValues } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const doneItems = useWatch({ control, name: 'done' });
  const failedItems = useWatch({ control, name: 'failed' });
  const error = useWatch({ control, name: 'error' });

  const allBatches = Math.ceil((airdropList?.length ?? 0) / BATCH_SIZE);
  const finished = Math.round(
    ((doneItems.length + failedItems.length) / allBatches) * 100
  );

  const isError = error || (finished && failedItems.length);
  const token = getValues('token');
  const airdropListAddress = getValues('airdropList');
  const airdropTotalAmount =
    airdropList?.reduce(
      (acc, { amount }) => acc.plus(amount),
      ZERO_BIG_NUMBER
    ) ?? ZERO_BIG_NUMBER;

  return (
    <Box
      p="xl"
      gap="2xl"
      display="flex"
      borderRadius="m"
      bg="lowestContainer"
      flexDirection="column"
    >
      {finished === 100 && (
        <Box
          p="s"
          gap="s"
          mx="auto"
          display="flex"
          bg="container"
          borderRadius="m"
          alignItems="center"
        >
          <LogoSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
          <Typography
            size="small"
            variant="title"
            fontWeight="700"
            color="onSurface"
            width="max-content"
          >
            SUI COINS
          </Typography>
        </Box>
      )}
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
        {isError
          ? `Batches were not sent`
          : finished !== 100
            ? 'Sending batches'
            : 'The airdrop has been sent'}
      </Typography>
      {finished === 100 && (
        <Box
          p="1rem"
          gap="xs"
          display="flex"
          bg="#F8F9FD"
          borderRadius="xs"
          alignItems="center"
          justifyContent="center"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Typography size="medium" variant="body">
            {formatMoney(
              FixedPointMath.toNumber(airdropTotalAmount, token.decimals)
            )}{' '}
            {token.symbol}
          </Typography>
          <ShiftRightSVG
            maxWidth="1.5rem"
            maxHeight="1.5rem"
            width="100%"
            height="100%"
          />
          <Typography size="medium" variant="body">
            {airdropListAddress?.length}
            {airdropListAddress!.length > 1 ? ' Addresses' : ' Address'}
          </Typography>
        </Box>
      )}
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
        {(error || finished === 100) && (
          <Button
            flex="1"
            variant="filled"
            onClick={goBack}
            justifyContent="center"
            borderRadius="xs"
            bg={error || failedItems.length ? 'error' : 'primary'}
            color={error || failedItems.length ? 'onError' : 'onPrimary'}
          >
            {error ? 'Resend Failed batches' : 'Got it'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AirdropProgressIndicator;
