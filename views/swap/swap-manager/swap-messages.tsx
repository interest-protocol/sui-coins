import { pathOr, propOr } from 'ramda';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

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
      setError(name, {});

    if (from?.type !== to?.type && errorMessage === 'sameTokens')
      setError(name, {});

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
    if (!!errorMessage || !from?.type || !to?.type) return;
    if (error)
      if (errors.to?.message !== 'error')
        setError('to', { type: 'custom', message: 'error' });

    if (hasNoMarket)
      if (errors.to?.message !== 'noMarket')
        setError('to', { type: 'custom', message: 'noMarket' });

    if (from?.type === to?.type)
      if (errors.to?.message !== 'sameTokens')
        setError('to', { type: 'custom', message: 'sameTokens' });

    if (amountNotEnough) {
      const name = fromValue ? 'from' : 'to';
      if (errors[name]?.message !== 'increaseAmount')
        setError(name, {
          type: 'custom',
          message: 'increaseAmount',
        });
    }
  }, [error, amountNotEnough, hasNoMarket, from?.type, to?.type, errorMessage]);

  return null;
};
