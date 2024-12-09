import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { ZERO_BIG_NUMBER } from '@/utils';

import { AirdropPreviewButtonProps, IAirdropForm } from '../../airdrop.types';
import { DotErrorSVG } from '@/svg';

const AirdropPreviewButton: FC<AirdropPreviewButtonProps> = ({
  handleOpenSummaryModal,
}) => {
  const { coinsMap } = useWeb3();
  const { colors } = useTheme() as Theme;
  const { control } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const tokenType = useWatch({ control, name: 'token.type' });
  const [isError, setIsError] = useState(false);

  const isDisabled = useMemo(() => {
    if (!airdropList || !airdropList.length) return true;

    const totalAirdropAmount = airdropList.reduce(
      (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
      ZERO_BIG_NUMBER
    );

    if (totalAirdropAmount.isZero()) {
      setIsError(true);
      return true;
    }

    if (!coinsMap[tokenType]) return true;

    const tokenBalance = coinsMap[tokenType].balance;

    if (
      coinsMap[tokenType].balance.isZero() ||
      tokenBalance.lt(totalAirdropAmount)
    ) {
      setIsError(true);
      return true;
    }

    if (isError) setIsError(false);

    return false;
  }, [airdropList, coinsMap[tokenType]]);

  return (
    <>
      {isError && (
        <Box
          p="s"
          gap="s"
          display="flex"
          color="outline"
          bg="lowContainer"
          borderRadius="xs"
          border="1px solid"
          borderColor="outline"
        >
          <DotErrorSVG
            width="100%"
            maxWidth="1rem"
            maxHeight="1rem"
            dotColor={colors.outlineVariant}
          />
          <Typography variant="label" size="medium">
            {`You don't have enough balance to airdrop`}
          </Typography>
        </Box>
      )}
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
    </>
  );
};

export default AirdropPreviewButton;
