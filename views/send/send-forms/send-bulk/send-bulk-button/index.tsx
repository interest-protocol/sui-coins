import { Box, Button } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { showTXSuccessToast } from '@/utils';

import { ISendBulkForm } from '../send-bulk.types';
import useCreateLink from './send-button.hooks';

const SendBulkFormButton: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const createLink = useCreateLink();
  const { control } = useFormContext<ISendBulkForm>();
  const object = useWatch({ control, name: 'object' });
  const quantity = useWatch({ control, name: 'quantity' });

  const onSuccess = (tx: SuiTransactionBlockResponse, id: string) => {
    showTXSuccessToast(tx, network);

    push(`${Routes[RoutesEnum.SendLink]}/${id}`);
  };

  const handleCreateLink = async () => {
    if (!object || !Number(object.value) || !Number(quantity)) return;

    const toasterId = toast.loading('Creating link...');

    try {
      await createLink(object, Number(quantity), onSuccess);
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
        disabled={!object || !Number(object.value) || !Number(quantity)}
      >
        Create Link
      </Button>
    </Box>
  );
};

export default SendBulkFormButton;
