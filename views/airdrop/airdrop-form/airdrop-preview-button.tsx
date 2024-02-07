import { Box, Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AirdropPreviewButtonProps, IAirdropForm } from '../airdrop.types';

const AirdropPreviewButton: FC<AirdropPreviewButtonProps> = ({
  handleOpenSummaryModal,
}) => {
  const { control } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const tokenBalance = useWatch({ control, name: 'token.balance' });

  const isDisabled = useMemo(
    () =>
      !airdropList ||
      !airdropList.length ||
      !airdropList.reduce((acc, { amount }) => acc + Number(amount), 0) ||
      !tokenBalance ||
      BigNumber(tokenBalance).lt(
        airdropList.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
          BigNumber(0)
        )
      ),
    [airdropList, tokenBalance]
  );

  return (
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
  );
};

export default AirdropPreviewButton;
