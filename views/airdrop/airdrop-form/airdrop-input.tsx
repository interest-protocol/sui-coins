import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';

import { AirdropInputProps, IAirdropForm } from '../airdrop.types';
import AirdropCustomAmountMethod from './airdrop-custom-amount-method';
import AirdropNftCoinsMethod from './airdrop-nft-coins-method';
import AirdropPreviewButton from './airdrop-preview-button';
import AirdropPreviewModal from './airdrop-preview-modal';
import AirdropUploadFile from './airdrop-upload-file';

const AirdropInput: FC<AirdropInputProps> = ({ setIsProgressView }) => {
  const { setModal, handleClose } = useModal();
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });

  const handleOpenSummaryModal = () =>
    setModal(
      <AirdropPreviewModal
        method={method}
        onClose={handleClose}
        setIsProgressView={setIsProgressView}
      />,
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
      {method === 'addressList' && <AirdropCustomAmountMethod />}
      <AirdropPreviewButton handleOpenSummaryModal={handleOpenSummaryModal} />
    </Box>
  );
};

export default AirdropInput;
