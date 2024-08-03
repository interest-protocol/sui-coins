import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { DotErrorSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import { AirdropPreviewButtonProps, IAirdropForm } from '../airdrop.types';
import { AIRDROP_ERRORS } from './airdrop-form.data';

const AirdropPreviewButton: FC<AirdropPreviewButtonProps> = ({
  handleOpenSummaryModal,
}) => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<IAirdropForm>();
  const airdropList = useWatch({ control, name: 'airdropList' });
  const tokenType = useWatch({ control, name: 'token.type' });

  const noCoin = !coinsMap[tokenType];
  const noBalance = !noCoin && coinsMap[tokenType].balance.isZero();
  const notValidList =
    airdropList &&
    airdropList
      .reduce((acc, { amount }) => acc.plus(BigNumber(amount)), BigNumber(0))
      .isZero();

  const balanceNotEnough =
    !!airdropList &&
    !noBalance &&
    coinsMap[tokenType].balance.lt(
      airdropList.reduce(
        (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
        ZERO_BIG_NUMBER
      )
    );

  const error = notValidList
    ? 'notValidList'
    : noCoin
      ? 'noCoin'
      : noBalance
        ? 'noBalance'
        : balanceNotEnough
          ? 'balanceNotEnough'
          : null;

  const isDisabled = useMemo(
    () =>
      !airdropList ||
      !airdropList.length ||
      notValidList ||
      noCoin ||
      noBalance ||
      balanceNotEnough,
    [airdropList, coinsMap[tokenType]]
  );

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="l">
      {error && (
        <Box
          p="s"
          mx="xl"
          gap="s"
          display="flex"
          borderRadius="xs"
          border="1px solid"
          bg="errorContainer"
          color="onErrorContainer"
          borderColor="onErrorContainer"
        >
          <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          <Typography variant="label" size="medium">
            {AIRDROP_ERRORS[error]}
          </Typography>
        </Box>
      )}
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
