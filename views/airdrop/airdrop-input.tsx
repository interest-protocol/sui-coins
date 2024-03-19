import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AirdropProgressProps, IAirdropForm } from './airdrop.types';
import AirdropPreviewButton from './airdrop-preview-button';
import AirdropPreviewModal from './airdrop-preview-modal';
import AirdropUploadFile from './airdrop-upload-file';

const AirdropInput: FC<AirdropProgressProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const handleCloseSummaryModal = () => setIsSummaryOpen(false);

  const handleOpenSummaryModal = () => setIsSummaryOpen(true);

  if (!token || !method) return null;

  return (
    <Box
      p="xl"
      gap="3xl"
      display="flex"
      borderRadius="xs"
      bg="lowContainer"
      flexDirection="column"
    >
      {method === 'csv' && <AirdropUploadFile />}
      <AirdropPreviewModal
        method={method}
        isOpen={isSummaryOpen}
        onClose={handleCloseSummaryModal}
        setIsProgressView={setIsProgressView}
      />
      <AirdropPreviewButton handleOpenSummaryModal={handleOpenSummaryModal} />
    </Box>
  );
};

export default AirdropInput;
