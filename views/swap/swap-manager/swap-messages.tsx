import { pathOr, propOr } from 'ramda';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';

import { SwapMessagesProps } from './swap-manager.types';

export const SwapMessages: FC<SwapMessagesProps> = ({
  error,
  errors,
  control,
  setError,
  hasNoMarket,
  isZeroSwapAmountIn,
  isZeroSwapAmountOut,
  isFetchingSwapAmountIn,
  isFetchingSwapAmountOut,
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
        !isFetchingSwapAmountOut &&
        !(isZeroSwapAmountOut && !!fromValue && !isFetchingSwapAmountOut) &&
        !isFetchingSwapAmountIn &&
        !(isZeroSwapAmountIn && !!toValue && !isFetchingSwapAmountIn) &&
        !(propOr('', 'type', from) === propOr('', 'type', to)) &&
        !hasNoMarket
    );
  }, [
    error,
    fromValue,
    toValue,
    isFetchingSwapAmountOut,
    isFetchingSwapAmountIn,
    isZeroSwapAmountIn,
    from,
    to,
    hasNoMarket,
  ]);

  const amountNotEnough =
    (isZeroSwapAmountIn && !!fromValue && !isFetchingSwapAmountIn) ||
    (isZeroSwapAmountOut && !!toValue && !isFetchingSwapAmountOut);

  const errorMessage = pathOr(null, ['to', 'message'], errors);

  // Clear errors
  useEffect(() => {
    // If there is no error or both tokens are not selected - do nothing
    if (!errorMessage || !from?.type || !to?.type) return;

    const name = fromValue ? 'from' : 'to';

    if (!amountNotEnough && errors[name]?.message === 'increaseAmount')
      setValue('error', "You don't have enough balance");

    if (from?.type !== to?.type && errorMessage === 'sameTokens')
      setValue('error', "You can't swap the same coin");

    if (!error && errorMessage === 'error') setError(name, {});

    if (!hasNoMarket && errorMessage === 'noMarket') setError(name, {});
  }, [error, amountNotEnough, hasNoMarket, errorMessage, from?.type, to?.type]);

  useEffect(() => {
    if ((isFetchingSwapAmountIn || isFetchingSwapAmountOut) && !toastState)
      setToastState(true);
  }, [isFetchingSwapAmountIn, isFetchingSwapAmountOut]);

  useEffect(() => {
    if (toastState) {
      setValue('swapping', true);
      toast.loading('Fetching prices');
    }
  }, [toastState]);

  useEffect(() => {
    if (!(isFetchingSwapAmountIn || isFetchingSwapAmountOut) && toastState) {
      setValue('swapping', false);
      setToastState(false);
      toast.dismiss();
    }
  }, [isFetchingSwapAmountIn, isFetchingSwapAmountOut]);

  // Set Error
  useEffect(() => {
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
      coinsMap[from.type]?.balance.lt(
        FixedPointMath.toBigNumber(fromValue, from.decimals)
      )
    ) {
      setValue('error', "Price value can't be greater than balance");
      return;
    }

    if (amountNotEnough) {
      setValue('error', "You don't have enough balance to swap");
      return;
    }
    setValue('error', null);
  }, [
    error,
    amountNotEnough,
    hasNoMarket,
    from?.type,
    to?.type,
    fromValue,
    errorMessage,
  ]);
  return null;
};
