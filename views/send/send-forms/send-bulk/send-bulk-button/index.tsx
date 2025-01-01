import { Box, Button, Dialog } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { showTXSuccessToast } from '@/utils';

import { ISendBulkForm } from '../send-bulk.types';
import useCreateLink from './send-button.hooks';

const SendBulkFormButton: FC = () => {
  const createLink = useCreateLink();
  const getExplorerUrl = useGetExplorerUrl();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<ISendBulkForm>();
  const object = useWatch({ control, name: 'object' });
  const quantity = useWatch({ control, name: 'quantity' });

  const onSuccess = (
    tx: TimedSuiTransactionBlockResponse,
    links: ReadonlyArray<string>
  ) => {
    showTXSuccessToast(tx, getExplorerUrl, 'Link created successfully');

    setValue('links', links);
  };

  const handleCreateLink = async () => {
    const toasterId = toast.loading('Creating link...');

    try {
      await createLink(object, Number(quantity), onSuccess);
    } catch (e) {
      toast.error((e as any).message ?? 'Something went wrong');
    } finally {
      toast.dismiss(toasterId);
    }
  };

  const isDisabled =
    !object ||
    !Number(object.value) ||
    !Number(quantity) ||
    Number(quantity) > 300;

  const onCreateLink = () => {
    if (isDisabled) return;

    setModal(
      <Dialog
        title="Caution"
        status="warning"
        message="Bulk links will be claimed in the same link, but the history page will only show the first item from the list"
        primaryButton={{
          label: 'Continue anyway',
          onClick: () => {
            handleClose();
            handleCreateLink();
          },
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: handleClose,
        }}
      />
    );
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button variant="filled" onClick={onCreateLink} disabled={isDisabled}>
        Create Link
      </Button>
    </Box>
  );
};

export default SendBulkFormButton;
