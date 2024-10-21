import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';

import { AirdropInputProps, IAirdropForm } from '../airdrop.types';
import AirdropCustomAmountMethod from './airdrop-common-amount-method';
import AirdropNftCoinsMethod from './airdrop-common-amount-method/airdrop-nft-coins-method';
import AirdropPreviewButton from './airdrop-preview-button';
import AirdropPreviewModal from './airdrop-preview-modal';
import AirdropSuiPlayHoldersMethod from './airdrop-sui-play-holders';
import AirdropUploadFile from './airdrop-upload-file';

const AirdropInput: FC<AirdropInputProps> = ({ setIsProgressView }) => {
  const { setModal, handleClose } = useModal();
  const form = useFormContext<IAirdropForm>();
  const { control } = form;
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });

  const handleOpenSummaryModal = () =>
    setModal(
      <FormProvider {...form}>
        <AirdropPreviewModal
          method={method}
          onClose={handleClose}
          setIsProgressView={setIsProgressView}
        />
      </FormProvider>,
      { custom: true }
    );

  if (!token || !method) return null;

  return (
    <Box
      p="xl"
      gap="3xl"
      display="flex"
      borderRadius="xs"
      bg="lowestContainer"
      flexDirection="column"
    >
      {method === 'csv' && <AirdropUploadFile />}
      {method === 'nft' && <AirdropNftCoinsMethod />}
      {method === 'suiPlay' && <AirdropSuiPlayHoldersMethod />}
      {method === 'addressList' && <AirdropCustomAmountMethod />}
      <AirdropPreviewButton handleOpenSummaryModal={handleOpenSummaryModal} />
    </Box>
  );
};

export default AirdropInput;
