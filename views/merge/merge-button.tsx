import { Box, Button } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useWeb3 } from '@/hooks/use-web3';
import { MergeSVG } from '@/svg';

import { useMergeCoins } from './merge.hooks';
import { IMergeForm } from './merge.types';

const MergeButton: FC = () => {
  const mergeCoins = useMergeCoins();
  const { coins, mutate } = useWeb3();
  const [loading, setLoading] = useState(false);
  const { control, reset } = useFormContext<IMergeForm>();
  const ignored = useWatch({ control, name: 'ignored' });

  const allCoinsToMerge = coins.filter(({ objects }) => objects.length > 1);
  const coinsToMerge = allCoinsToMerge.filter(
    ({ type }) => !ignored.includes(type)
  );

  const handleMergeCoins = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading('Merging coins...');
    try {
      await mergeCoins(coinsToMerge);
      toast.success('All coins merged!');
    } catch (e) {
      toast.error((e as Error).message ?? 'Failed to merge coins.');
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
      mutate();
    }
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
      gridTemplateColumns="1fr 2fr"
    >
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
