import { Box, Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import invariant from 'tiny-invariant';

import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { MergeSVG } from '@/svg';
import { isSui, showTXSuccessToast, signAndExecute } from '@/utils';

import { IMergeForm } from './merge.types';

const MergeButton: FC = () => {
  const { coins } = useWeb3();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const { handleClose } = useModal();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { control } = useFormContext<IMergeForm>();
  const ignored = useWatch({ control, name: 'ignored' });

  const allCoinsToMerge = coins.filter(({ objects }) => objects.length > 1);
  const coinsToMerge = allCoinsToMerge.filter(
    ({ type }) => !ignored.includes(type)
  );

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
        suiClient,
        currentAccount,
        tx,
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
    <Box
      p="l"
      gap="xs"
      mx="auto"
      width="25rem"
      bg="onPrimary"
      display="grid"
      borderRadius="xs"
      gridTemplateColumns="1fr 3fr"
    >
      <Button
        p="s"
        gap="m"
        variant="tonal"
        justifyContent="center"
        onClick={handleMergeCoins}
        disabled={!coinsToMerge.length}
      >
        clear
      </Button>
      <Button
        p="s"
        gap="m"
        variant="filled"
        justifyContent="center"
        onClick={handleMergeCoins}
        disabled={!coinsToMerge.length}
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
