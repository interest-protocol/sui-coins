import {
  Box,
  Button,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { useWeb3 } from '@/hooks/use-web3';
import { MergeSVG } from '@/svg';
import { useMergeCoins } from '@/views/merge/merge.hooks';

const MergeCoins: FC = () => {
  const mergeCoins = useMergeCoins();
  const { coins, mutate } = useWeb3();
  const [loading, setLoading] = useState(false);

  const coinsToMerge = coins.filter(({ objects }) => objects.length > 1);

  const handleMergeCoins = async () => {
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading('Merging coins...');
    try {
      await mergeCoins(coinsToMerge);
    } catch (e) {
      toast.error((e as Error).message ?? 'Failed to merge coins.');
    } finally {
      toast.dismiss(toastId);
      mutate();
      setLoading(false);
    }
  };

  return (
    <Box right="2rem" bottom="2rem" position="fixed">
      <TooltipWrapper
        px="s"
        whiteSpace="nowrap"
        bg="lowestContainer"
        tooltipPosition="left"
        boxShadow="0 0 1rem #0003"
        tooltipContent={
          coinsToMerge.length
            ? `Merge all ${coinsToMerge.length} coins`
            : 'Nothing to merge'
        }
      >
        {!!coinsToMerge.length && (
          <Typography
            zIndex="1"
            bg="error"
            size="medium"
            display="flex"
            width="1.5rem"
            height="1.5rem"
            variant="label"
            color="onError"
            right="-0.5rem"
            alignItems="center"
            position="absolute"
            borderRadius="full"
            justifyContent="center"
          >
            {coinsToMerge.length}
          </Typography>
        )}
        <Button
          isIcon
          width="3rem"
          height="3rem"
          variant="filled"
          borderRadius="full"
          onClick={handleMergeCoins}
          disabled={loading || !coinsToMerge.length}
        >
          <MergeSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Button>
      </TooltipWrapper>
    </Box>
  );
};

export default MergeCoins;
