import { Box, Button } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { showTXSuccessToast } from '@/utils';

import { ISendSimpleForm } from '../send-simple.types';
import useCreateLink from './send-button.hooks';

const SendButton: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const createLink = useCreateLink();
  const { control } = useFormContext<ISendSimpleForm>();
  const objects = useWatch({ control, name: 'objects' });

  const onSuccess = (tx: SuiTransactionBlockResponse, id: string) => {
    showTXSuccessToast(tx, network);

    push(`${Routes[RoutesEnum.SendLink]}/${id}`);
  };

  const handleCreateLink = async () => {
    if (
      !objects ||
      !objects.length ||
      !objects.every(({ value }) => Number(value))
    )
      return;

    const toasterId = toast.loading('Creating link...');

    try {
      await createLink(objects, onSuccess);
      toast.success('Link created successfully');
    } catch {
      toast.error('Something went wrong');
    } finally {
      toast.dismiss(toasterId);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="filled"
        onClick={handleCreateLink}
        disabled={
          !objects ||
          !objects.length ||
          !objects.every(({ value }) => Number(value))
        }
      >
        Create Link
      </Button>
    </Box>
  );
};

export default SendButton;
