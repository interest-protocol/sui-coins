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

import { TokenIcon } from '@/components';
import ChevronDoubleLeft from '@/components/svg/chevron-double-left';
import { EXPLORER_URL, Network } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { LogoSVG } from '@/svg';
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
            <Box>
              <Box display="flex" flexDirection="column" gap="m" mb="2rem">
                <Box
                  py="m"
                  px="s"
                  gap="s"
                  bg="surface"
                  display="flex"
                  borderRadius="xs"
                  justifyContent="center"
                >
                  <Box display="flex" alignItems="center">
                    <TokenIcon
                      withBg
                      rounded
                      size="1rem"
                      type={formSwap.getValues('from.type')}
                      symbol={formSwap.getValues('from.symbol')}
                      network={network as Network}
                    />
                    <Typography
                      alignItems="center"
                      textAlign="center"
                      color="onSurface"
                      variant="body"
                      size="medium"
                      display="flex"
                      fontSize="0.9rem"
                      ml="s"
                    >
                      {`${formSwap.getValues('from.display')} ${formSwap.getValues('from.symbol')}`}
                    </Typography>
                  </Box>
                  <Box>
                    <ChevronDoubleLeft
                      maxHeight="0.75rem"
                      maxWidth="0.75rem"
                      width="100%"
                    />
                  </Box>
                  <Box display="flex" alignItems="center">
                    <TokenIcon
                      withBg
                      rounded
                      size="1rem"
                      type={formSwap.getValues('to.type')}
                      symbol={formSwap.getValues('to.symbol')}
                      network={network as Network}
                    />
                    <Typography
                      alignItems="center"
                      textAlign="center"
                      color="onSurface"
                      variant="body"
                      size="medium"
                      display="flex"
                      fontSize="0.9rem"
                      ml="s"
                    >
                      {`${formSwap.getValues('to.display')} ${formSwap.getValues('to.symbol')}`}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  color="outlineVariant"
                  textAlign="center"
                  variant="body"
                  size="medium"
                  fontSize="0.75rem"
                  lineHeight="1.5rem"
                >
                  Execution time:
                  <Typography
                    color="primary"
                    textAlign="center"
                    variant="body"
                    size="medium"
                    as="span"
                    fontSize="0.75rem"
                    lineHeight="1.5rem"
                  >
                    {` ${+(formSwap.getValues('executionTime') / 1000).toFixed(2)}s`}
                  </Typography>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mb="0.5rem">
                <Typography
                  alignItems="center"
                  textAlign="center"
                  color="onSurface"
                  variant="headline"
                  size="small"
                  display="flex"
                  fontSize="1rem"
                  lineHeight="1.406rem"
                >
                  BY:
                </Typography>
                <Box
                  ml="0.75rem"
                  display="flex"
                  minWidth="1.5rem"
                  minHeight="1.5rem"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LogoSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
                </Box>
                <Box ml="0.5rem" display="flex" alignItems="center">
                  <Typography
                    size="medium"
                    variant="title"
                    fontWeight="700"
                    color="onSurface"
                    width="max-content"
                    fontSize="0.75rem"
                    lineHeight="1.125rem"
                  >
                    SUI COINS
                  </Typography>
                </Box>
              </Box>
              <a
                href="https://www.suicoins.com"
                target="_blank"
                rel="noopener, noreferrer"
              >
                <Typography
                  alignItems="center"
                  textAlign="center"
                  variant="body"
                  size="small"
                  display="flex"
                  lineHeight="1.5rem"
                  fontSize="0.75rem"
                  width="fit-content"
                  mx="auto"
                  color="primary"
                  mt="0.5rem"
                >
                  www.suicoins.com
                </Typography>
              </a>
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
