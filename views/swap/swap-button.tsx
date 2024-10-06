import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import ChevronDoubleLeft from '@/components/svg/chevron-double-left';
import { EXPLORER_URL, Network } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import {
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { SwapMessagesEnum } from './swap.data';
import { useSwap } from './swap.hooks';

const SwapButton: FC = () => {
  const swap = useSwap();
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();
  const { dialog, handleClose } = useDialog();

  const signTransaction = useSignTransaction();

  const resetInput = () => {
    formSwap.setValue('to.display', '0');
    formSwap.setValue('from.display', '0');
    formSwap.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const swapping = useWatch({
    control: formSwap.control,
    name: 'swapping',
  });

  const readyToSwap = useWatch({
    control: formSwap.control,
    name: 'readyToSwap',
  });

  const gotoExplorer = () => {
    window.open(
      formSwap.getValues('explorerLink'),
      '_blank',
      'noopener,noreferrer'
    );

    formSwap.setValue('explorerLink', '');
  };

  const handleSwap = async () => {
    try {
      invariant(currentAccount, 'Need to connect wallet');

      formSwap.setValue('swapping', true);

      const tx = await swap(formSwap.getValues());

      const tx2 = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(tx2);
      formSwap.setValue('executionTime', tx2.time);

      await waitForTx({ suiClient, digest: tx2.digest });

      formSwap.setValue(
        'explorerLink',
        `${EXPLORER_URL[network as Network]}/tx/${tx2.digest}`
      );
    } finally {
      formSwap.setValue('swapping', false);
    }
  };

  const onSwap = async () => {
    readyToSwap &&
      (await dialog.promise(handleSwap(), {
        loading: () => ({
          title: 'Swapping...',
          message: SwapMessagesEnum.swapping,
        }),
        error: () => ({
          title: 'Swap Failure',
          message: SwapMessagesEnum.swapFailure,
          primaryButton: { label: 'Try again', onClick: handleClose },
        }),
        success: () => ({
          title: 'Swap Successfully',
          message: (
            <Box display="flex" flexDirection="column" gap="m" mb="l">
              <Typography
                color="onSurface"
                textAlign="center"
                lineHeight="m"
                variant="body"
                size="medium"
              >
                Your swap was successfully, and you can check it on the Explorer
              </Typography>
              <Box
                p="m"
                gap="m"
                bg="surface"
                display="flex"
                borderRadius="xs"
                justifyContent="center"
              >
                <Typography
                  alignItems="center"
                  textAlign="center"
                  color="onSurface"
                  variant="body"
                  size="medium"
                  display="flex"
                >
                  {`${formSwap.getValues('from.display')} ${formSwap.getValues('from.symbol')}`}
                </Typography>
                <Box>
                  <ChevronDoubleLeft
                    maxHeight="0.75rem"
                    maxWidth="0.75rem"
                    width="100%"
                  />
                </Box>
                <Typography
                  alignItems="center"
                  textAlign="center"
                  color="onSurface"
                  variant="body"
                  size="medium"
                  display="flex"
                >
                  {`${formSwap.getValues('to.display')} ${formSwap.getValues('to.symbol')}`}
                </Typography>
              </Box>
              <Typography
                color="outlineVariant"
                textAlign="center"
                lineHeight="m"
                variant="body"
                size="medium"
              >
                Execution time:
                <Typography
                  color="primary"
                  textAlign="center"
                  lineHeight="m"
                  variant="body"
                  size="medium"
                  as="span"
                >
                  {` ${+(formSwap.getValues('executionTime') / 1000).toFixed(2)}s`}
                </Typography>
              </Typography>
            </Box>
          ),
          primaryButton: {
            label: 'See on Explorer',
            onClick: gotoExplorer,
          },
          secondaryButton: (
            <Button variant="outline" mr="s" onClick={handleClose}>
              got it
            </Button>
          ),
        }),
      }));

    resetInput();
  };
  return (
    <Button
      onClick={onSwap}
      variant="filled"
      disabled={!readyToSwap}
      justifyContent="center"
    >
      <Typography variant="label" size="large">
        {swapping ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
