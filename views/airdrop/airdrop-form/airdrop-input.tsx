import { Box, Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AirdropInputProps, IAirdropForm } from '../airdrop.types';
import AirdropCustomAmountMethod from './airdrop-custom-amount-method';
import AirdropNftCoinsMethod from './airdrop-nft-coins-method';
import AirdropPreviewModal from './airdrop-preview-modal';
import AirdropUploadFile from './airdrop-upload-file';

const AirdropInput: FC<AirdropInputProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const airdropList = useWatch({ control, name: 'airdropList' });

  const isDisabled = useMemo(
    () =>
      !airdropList ||
      !token?.balance ||
      BigNumber(token.balance).lt(
        BigNumber(
          airdropList?.reduce(
            (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
            BigNumber(0)
          )
        )
      ),
    [airdropList, token]
  );

  const handleCloseSummaryModal = () => setIsSummaryOpen(false);

  const handleOpenSummaryModal = () => setIsSummaryOpen(true);

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
      {method === 'coin' && <AirdropNftCoinsMethod />}
      {method === 'customAmount' && <AirdropCustomAmountMethod />}
      <AirdropPreviewModal
        method={method}
        isOpen={isSummaryOpen}
        onClose={handleCloseSummaryModal}
        setIsProgressView={setIsProgressView}
      />
      <Box display="flex" justifyContent="center">
        <Button
          variant="filled"
          borderRadius="xs"
          disabled={isDisabled}
          onClick={handleOpenSummaryModal}
        >
          Review & Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default AirdropInput;
