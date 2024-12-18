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

import {
  AirdropPreviewButtonProps,
  ErrorProps,
  IAirdropForm,
} from '../../airdrop.types';
import { DotErrorSVG } from '@/svg';
import { FixedPointMath } from '@/lib';

const AirdropPreviewButton: FC<AirdropPreviewButtonProps> = ({
  handleOpenSummaryModal,
}) => {
  const { coinsMap } = useWeb3();
  const { colors } = useTheme() as Theme;
  const { control } = useFormContext<IAirdropForm>();

  const airdropList = useWatch({ control, name: 'airdropList' });
  const tokenDecimals = useWatch({ control, name: 'token.decimals' });
  const token = useWatch({ control, name: 'token' });
  const tokenType = useWatch({ control, name: 'token.type' });
  const [isError, setIsError] = useState<ErrorProps>({
    state: false,
  });

  const isDisabled = useMemo(() => {
    const tokenBalance = FixedPointMath.toNumber(
      coinsMap[tokenType]?.balance ?? ZERO_BIG_NUMBER,
      tokenDecimals
    );

    if (!airdropList || !airdropList.length) {
      setIsError({
        state: true,
        message: 'Please select an airdrop list',
      });
      return true;
    }

    const totalAirdropAmount = airdropList.reduce(
      (acc, { amount }) => acc.plus(BigNumber(amount)),
      ZERO_BIG_NUMBER
    );

    if (tokenBalance === 0) {
      setIsError({
        state: true,
        message: "You don't have enough balance to airdrop",
      });
      return true;
    }

    if (totalAirdropAmount.isZero()) {
      setIsError({
        state: true,
        message:
          'Your total amount to aidrop is 0, Please verify if you have enough amount',
      });
      return true;
    }

    if (!coinsMap[tokenType]) return true;

    const formattedAirdropAmount = FixedPointMath.toNumber(totalAirdropAmount);

    if (
      coinsMap[tokenType].balance.isZero() ||
      tokenBalance < formattedAirdropAmount
    ) {
      setIsError({
        state: true,
        message: 'Your balance is less than the total airdrop amount',
      });
      return true;
    }

    if (isError.state)
      setIsError({
        state: false,
      });

    return false;
  }, [airdropList, coinsMap[tokenType]]);

  return (
    <>
      {isError.state && (
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
            {isError.message}
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
