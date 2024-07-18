import BigNumber from 'bignumber.js';
import { propOr } from 'ramda';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { isSui, ZERO_BIG_NUMBER } from '@/utils';

import { SwapMessagesProps } from './swap-manager.types';

export const SwapMessages: FC<SwapMessagesProps> = ({
  error,
  control,
  hasNoMarket,
  isZeroSwapAmount,
  isFetchingSwapAmount,
}) => {
  const { setValue } = useFormContext();
  const { coinsMap } = useWeb3();
  const from = useWatch({ control: control, name: 'from' });
  const to = useWatch({ control: control, name: 'to' });
  const [toastState, setToastState] = useState<boolean>(false);

  const fromValue = +(propOr('0', 'value', from) as string);
  const toValue = +(propOr('0', 'value', to) as string);

  useEffect(() => {
    setValue(
      'readyToSwap',
      !(error && fromValue > 0) &&
        !(error && toValue > 0) &&
        !isFetchingSwapAmount &&
        !(isZeroSwapAmount && !!fromValue && !isFetchingSwapAmount) &&
        !(propOr('', 'type', from) === propOr('', 'type', to)) &&
        !hasNoMarket
    );
  }, [error, fromValue, toValue, isFetchingSwapAmount, from, to, hasNoMarket]);

  const amountNotEnough =
    isZeroSwapAmount && !!fromValue && !isFetchingSwapAmount;

  useEffect(() => {
    if (isFetchingSwapAmount && !toastState) setToastState(true);
  }, [isFetchingSwapAmount]);

  useEffect(() => {
    if (toastState) {
      setValue('swapping', true);
      toast.loading('Fetching prices');
    }
  }, [toastState]);

  useEffect(() => {
    if (!isFetchingSwapAmount && toastState) {
      setValue('swapping', false);
      setToastState(false);
      toast.dismiss();
    }
  }, [isFetchingSwapAmount]);

  // Set Error
  useEffect(() => {
    if (!from?.type || !to?.type) return;

    // If there is already an error or both tokens are not selected -> do nothing
    if (error) {
      setValue('error', 'Something went wrong');
      return;
    }

    if (hasNoMarket) {
      setValue('error', 'Has no market for this coin');
      return;
    }

    if (from?.type === to?.type) {
      setValue('error', "You can't swap the same coin");
      return;
    }

    if (
      FixedPointMath.toNumber(
        coinsMap[from.type]?.balance ?? ZERO_BIG_NUMBER,
        from.decimals
      ) < Number(fromValue)
    ) {
      setValue('error', "Sell value can't be greater than balance");
      return;
    }

    if (
      isSui(from.type) &&
      FixedPointMath.toNumber(
        coinsMap[from.type]?.balance.minus(BigNumber(100000000)) ??
          ZERO_BIG_NUMBER,
        from.decimals
      ) < Number(fromValue)
    ) {
      setValue('error', 'You should leave at least 0.1 MOVE for gas');
      return;
    }

    if (amountNotEnough) {
      setValue('error', "You don't have enough balance to swap");
      return;
    }
    setValue('error', null);
  }, [error, amountNotEnough, hasNoMarket, from?.type, to?.type, fromValue]);

  return null;
};
