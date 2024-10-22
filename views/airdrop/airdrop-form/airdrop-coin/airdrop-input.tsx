import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';

import { AirdropCoinProps, IAirdropForm } from '../../airdrop.types';
import AirdropPreviewModal from '../airdrop-preview-modal';
import AirdropCommonAmountField from './airdrop-common-amount-field';
import AirdropPreviewButton from './airdrop-preview-button';

const AirdropInput: FC<AirdropCoinProps> = ({ setIsProgressView }) => {
  const { setModal, handleClose } = useModal();
  const form = useFormContext<IAirdropForm>();
  const { control } = form;
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

  return (
    <>
      {method !== 'csv' && <AirdropCommonAmountField />}
      <AirdropPreviewButton handleOpenSummaryModal={handleOpenSummaryModal} />
    </>
  );
};

export default AirdropInput;
