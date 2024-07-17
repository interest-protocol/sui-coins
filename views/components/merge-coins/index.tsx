import {
  Box,
  Button,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { FC } from 'react';
import toast from 'react-hot-toast';
import invariant from 'tiny-invariant';

import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { MergeSVG } from '@/svg';
import { isSui, showTXSuccessToast, signAndExecute } from '@/utils';

const MergeCoins: FC = () => {
  const { coins } = useWeb3();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const { handleClose } = useModal();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  const coinsToMerge = coins.filter(({ objects }) => objects.length > 1);

  const handleMergeCoins = async () => {
    const toastId = toast.loading('Merging coins...');
    try {
      invariant(currentAccount?.address, 'You must be connected');

      const tx = new Transaction();

      coinsToMerge
        .filter(({ type }) => !isSui(type))
        .map(({ objects: [target, ...others] }) => {
          const targetCoinObject = tx.object(target.coinObjectId);

          tx.mergeCoins(
            targetCoinObject,
            others.map(({ coinObjectId }) => coinObjectId)
          );
        });

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      toast.success('Coins merged successfully!');
      showTXSuccessToast(txResult, network);
      handleClose();
    } catch (e) {
      toast.error((e as Error).message ?? 'Failed to merge coins.');
    } finally {
      toast.dismiss(toastId);
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
          coinsToMerge.length > 1
            ? `Merge all ${coinsToMerge.length} coins`
            : 'Nothing to merge'
        }
      >
        {coinsToMerge.length > 1 && (
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
          disabled={!(coinsToMerge.length > 1)}
        >
          <MergeSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Button>
      </TooltipWrapper>
    </Box>
  );
};

export default MergeCoins;
