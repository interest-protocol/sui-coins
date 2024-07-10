import { Button, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL, Network } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { ZERO_BIG_NUMBER } from '@/utils';
import { DCAForm } from '@/views/dca/dca.types';

import { DCAMessagesEnum } from './dca.data';

const SwapButton: FC = () => {
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const formDCA = useFormContext<DCAForm>();
  const { dialog, handleClose } = useDialog();

  const resetInput = () => {
    formDCA.setValue('to.display', '0');
    formDCA.setValue('from.display', '0');
    formDCA.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const swapping = useWatch({
    control: formDCA.control,
    name: 'swapping',
  });

  const readyToStartDCA = useWatch({
    control: formDCA.control,
    name: 'readyToStartDCA',
  });

  const gotoExplorer = () => {
    window.open(
      formDCA.getValues('explorerLink'),
      '_blank',
      'noopener,noreferrer'
    );

    formDCA.setValue('explorerLink', '');
  };

  const handleSwap = async () => {
    try {
      invariant(currentAccount, 'Need to connect wallet');

      formDCA.setValue('swapping', true);

      const digest = '';

      formDCA.setValue(
        'explorerLink',
        `${EXPLORER_URL[network as Network]}/tx/${digest}`
      );
    } finally {
      resetInput();
      formDCA.setValue('swapping', false);
    }
  };

  const onSwap = () =>
    readyToStartDCA &&
    dialog.promise(handleSwap(), {
      loading: {
        title: 'Swapping...',
        message: DCAMessagesEnum.swapping,
      },
      error: {
        title: 'DCA Failure',
        message: DCAMessagesEnum.swapFailure,
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
      success: {
        title: 'DCA Successfully',
        message: DCAMessagesEnum.swapSuccess,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button variant="outline" mr="s" onClick={handleClose}>
            got it
          </Button>
        ),
      },
    });

  return (
    <Button
      onClick={onSwap}
      variant="filled"
      disabled={!readyToStartDCA}
      justifyContent="center"
    >
      <Typography variant="label" size="large">
        {swapping ? 'Swapping...' : 'DCA'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
