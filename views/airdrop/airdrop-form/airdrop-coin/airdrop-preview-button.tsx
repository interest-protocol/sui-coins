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
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import {
  AirdropPreviewButtonProps,
  ErrorProps,
  IAirdropForm,
} from '../../airdrop.types';

const AirdropPreviewButton: FC<AirdropPreviewButtonProps> = ({
  handleOpenSummaryModal,
}) => {
  const { coinsMap } = useWeb3();
  const { colors } = useTheme() as Theme;

  const { control } = useFormContext<IAirdropForm>();

  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });
  const airdropList = useWatch({ control, name: 'airdropList' });
  const commonAmount = useWatch({ control, name: 'commonAmount' });
  const amountForAll = useWatch({ control, name: 'amountForAll' });
  const [isError, setIsError] = useState<ErrorProps>({
    state: false,
  });

  const isDisabled = useMemo(() => {
    const totalAirdropAmount = FixedPointMath.toNumber(
      (airdropList || []).reduce(
        (acc, { amount }) => acc.plus(BigNumber(amount == 'NaN' ? 0 : amount)),
        ZERO_BIG_NUMBER
      )
    );

    const airdropSize = (airdropList || []).length;
    const currentAmount = commonAmount
      ? +(Number(commonAmount) / (amountForAll ? airdropSize : 1)).toFixed(
          token?.decimals
        )
      : 0;

    if (!currentAmount) {
      if (method != 'csv') {
        setIsError({
          state: false,
        });
        return true;
      }
    }

    const tokenBalance = FixedPointMath.toNumber(
      coinsMap[token?.type]?.balance ?? ZERO_BIG_NUMBER,
      token?.decimals
    );

    if (token) {
      if (totalAirdropAmount > tokenBalance) {
        setIsError({
          state: true,
          message: `You do not have enough tokens. Total amount to airdrop is ${totalAirdropAmount} ${token?.symbol}.`,
        });
        return true;
      }
    } else {
      setIsError({
        state: false,
      });
      return true;
    }

    if (isError.state)
      setIsError({
        state: false,
      });

    return false;
  }, [airdropList, coinsMap[token?.type]]);

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
