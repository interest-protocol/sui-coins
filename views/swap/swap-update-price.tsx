import { Box, Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE } from '@/constants/clamm';
import { useNetwork } from '@/context/network';
import { FixedPointMath } from '@/lib';
import { RefreshSVG } from '@/svg';

import { useAftermathRouter } from './swap.hooks';
import { SwapForm } from './swap.types';

const countdownRenderer =
  (interval: string): CountdownRendererFn =>
  // eslint-disable-next-line react/display-name
  ({ completed, seconds }) => {
    if (completed) return <ProgressIndicator size={24} variant="loading" />;

    return (
      <ProgressIndicator
        size={24}
        noAnimation
        variant="circle"
        value={(seconds * 100) / Number(interval)}
      />
    );
  };

const SwapUpdatePrice: FC = () => {
  const network = useNetwork();
  const aftermathRouter = useAftermathRouter();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const coinInType = useWatch({
    control,
    name: 'from.type',
  });

  const [coinInValue] = useDebounce(
    useWatch({
      control,
      name: 'from.value',
    }),
    800
  );

  const coinOutType = useWatch({
    control,
    name: 'to.type',
  });

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  const interval = useWatch({
    control,
    name: 'settings.interval',
  });

  const lastFetchDate = useWatch({
    control,
    name: 'lastFetchDate',
  });

  const fetchingPrices = useWatch({
    control,
    name: 'fetchingPrices',
  });

  const resetFields = () => {
    setValue('route', null);
    setValue('to.display', '0');
    setValue('lastFetchDate', null);
    setValue('fetchingPrices', false);
    setValue('error', null);
  };

  const disabled = !coinInValue || coinInValue.isZero() || !coinOutType;

  const { mutate } = useSWR(
    `${coinInType}-${coinOutType}-${coinInValue?.toString()}-${network}`,
    async () => {
      if (disabled) {
        resetFields();
        return;
      }

      if (swapping) return;

      setValue('fetchingPrices', true);

      const data = await aftermathRouter
        .getCompleteTradeRouteGivenAmountIn({
          coinInType,
          coinOutType,
          coinInAmount: BigInt(
            coinInValue.decimalPlaces(0, BigNumber.ROUND_DOWN).toString()
          ),
          referrer: TREASURY,
          externalFee: {
            recipient: TREASURY,
            feePercentage: EXCHANGE_FEE,
          },
        })
        .catch((e) => {
          resetFields();
          setValue('error', 'There is no market for these coins.');
          throw e;
        })
        .finally(() => {
          setValue('fetchingPrices', false);
        });

      setValue('route', data);

      setValue(
        'to.display',
        Number(
          (
            (FixedPointMath.toNumber(coinInValue, getValues('from.decimals')) *
              10 ** (getValues('from.decimals') - getValues('to.decimals'))) /
            data.spotPrice
          ).toFixed(6)
        ).toPrecision()
      );

      setValue('lastFetchDate', Date.now());
    },
    { refreshInterval: Number(interval) * 1000, refreshWhenOffline: false }
  );

  return (
    <Button
      isIcon
      bg="onPrimary"
      width="1.5rem"
      height="1.5rem"
      color="primary"
      variant="filled"
      alignItems="center"
      position="relative"
      disabled={disabled}
      nFocus={!disabled && { bg: 'lowContainer' }}
      nActive={!disabled && { bg: 'lowContainer' }}
      nHover={!disabled ? { bg: 'lowContainer' } : { bg: 'lowestContainer' }}
      nDisabled={
        disabled && {
          opacity: 1,
          color: 'outline',
          bg: 'lowestContainer',
          nHover: {
            bg: 'lowestContainer',
          },
        }
      }
      onClick={() => {
        Number(coinInValue) && mutate();
      }}
    >
      {fetchingPrices ? (
        <Box as="span" display="flex" position="absolute">
          <ProgressIndicator size={24} variant="loading" />
        </Box>
      ) : lastFetchDate ? (
        <Box as="span" display="flex" position="absolute">
          <Countdown
            date={lastFetchDate + Number(interval) * 1000}
            renderer={countdownRenderer(interval)}
          />
        </Box>
      ) : (
        <Box as="span" display="flex">
          <RefreshSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      )}
    </Button>
  );
};

export default SwapUpdatePrice;
