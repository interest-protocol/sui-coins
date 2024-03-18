import { Box, Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { ZERO_BIG_NUMBER } from '@/utils';

import { AirdropPreviewButtonProps, IAirdropForm } from '../airdrop.types';

const AirdropPreviewButton: FC<AirdropPreviewButtonProps> = ({
  handleOpenSummaryModal,
}) => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const tokenType = useWatch({ control, name: 'token.type' });

  const isDisabled = useMemo(
    () =>
      !airdropList ||
      !airdropList.length ||
      airdropList
        .reduce((acc, { amount }) => acc.plus(BigNumber(amount)), BigNumber(0))
        .isZero() ||
      !coinsMap[tokenType] ||
      coinsMap[tokenType].balance.isZero() ||
      coinsMap[tokenType].balance.lt(
        airdropList.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
          ZERO_BIG_NUMBER
        )
      ),
    [airdropList, coinsMap[tokenType]]
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
