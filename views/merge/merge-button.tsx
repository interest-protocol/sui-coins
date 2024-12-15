import { Box, Button } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useDialog } from '@/hooks/use-dialog';
import { useWeb3 } from '@/hooks/use-web3';
import { MergeSVG, TrashSVG } from '@/svg';

import SuccessModal from '../components/success-modal';
import { useMergeCoins } from './merge.hooks';
import { IMergeForm } from './merge.types';

const MergeButton: FC = () => {
  const mergeCoins = useMergeCoins();
  const { coins, mutate } = useWeb3();
  const [loading, setLoading] = useState(false);
  const { control, reset, setValue, getValues } = useFormContext<IMergeForm>();
  const { dialog, handleClose } = useDialog();

  const ignored = useWatch({ control, name: 'ignored' });

  const allCoinsToMerge = coins.filter(({ objectsCount }) => objectsCount > 1);

  const coinsToMerge = allCoinsToMerge.filter(
    ({ type }) => !ignored.includes(type)
  );

  const fillIgnored = () =>
    setValue(
      'ignored',
      allCoinsToMerge.map(({ type }) => type)
    );

  const onSetExecutionTime = (time: number) => {
    setValue('executionTime', time);
  };

  const onMergeCoins = async () => {
    try {
      await mergeCoins(coinsToMerge, onSetExecutionTime);
    } finally {
      mutate();
    }
  };

  const handleMergeCoins = async () => {
    setLoading(true);
    await dialog.promise(onMergeCoins(), {
      loading: () => ({
        title: 'Merging coins...',
        message:
          'We are starting merge your coins, and you will let you know when it is done',
      }),
      error: () => ({
        title: 'Merge Coins Failure',
        message: 'Failed to merge coins.',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
        title: 'Merge Coin Successful',
        message: (
          <SuccessModal
            transactionTime={`${+(getValues('executionTime') / 1000).toFixed(2)}`}
          >
            <Box
              py="m"
              px="s"
              gap="s"
              bg="surface"
              display="flex"
              borderRadius="xs"
              justifyContent="center"
            >
              All coins merged!
            </Box>
          </SuccessModal>
        ),
        primaryButton: {
          label: 'Got it',
          onClick: handleClose,
        },
      }),
    });
    setLoading(false);
  };

  return (
    <Box
      p="l"
      gap="xs"
      mx="auto"
      bg="onPrimary"
      display="grid"
      maxWidth="25rem"
      borderRadius="xs"
      bottom="0"
      position="sticky"
      gridTemplateColumns="1fr 2fr 3fr"
    >
      <Button
        p="s"
        gap="m"
        bg="error"
        variant="filled"
        onClick={fillIgnored}
        justifyContent="center"
        color="onSurfaceContainer"
        disabled={loading || !(allCoinsToMerge.length - ignored.length)}
        nHover={{ bg: 'errorContainer', color: 'onErrorContainer' }}
      >
        <TrashSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      </Button>
      <Button
        p="s"
        gap="m"
        variant="tonal"
        justifyContent="center"
        onClick={() => reset()}
        disabled={loading || !ignored.length}
      >
        Select All
      </Button>
      <Button
        p="s"
        gap="m"
        variant="filled"
        justifyContent="center"
        onClick={handleMergeCoins}
        disabled={loading || !coinsToMerge.length}
        PrefixIcon={
          <MergeSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
        }
      >
        Merge
      </Button>
    </Box>
  );
};

export default MergeButton;
