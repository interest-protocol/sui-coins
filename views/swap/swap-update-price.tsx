import { Box, Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE } from '@/constants/dex';
import { useHopSdk } from '@/hooks/use-hop-sdk';
import { FixedPointMath } from '@/lib';
import { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';
import { RefreshSVG } from '@/svg';

import { SwapMessagesEnum } from './swap.data';
import { useAftermathRouter } from './swap.hooks';
import { Aggregator, SwapForm } from './swap.types';

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
  const hopSdk = useHopSdk();
  const { network } = useSuiClientContext();
  const aftermathRouter = useAftermathRouter();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const coinInType = useWatch({
    control,
    name: 'from.type',
  });

  const aggregator = useWatch({ control, name: 'settings.aggregator' });

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

  const { mutate, error } = useSWR(
    `${coinInType}-${coinOutType}-${coinInValue?.toString()}-${network}-${aggregator}`,
    async () => {
      if (disabled) {
        resetFields();
        return;
      }

      if (swapping) return;

      setValue('fetchingPrices', true);

      const data = await (aggregator === Aggregator.Aftermath
        ? aftermathRouter.getCompleteTradeRouteGivenAmountIn({
            coinInType,
            coinOutType,
            referrer: TREASURY,
            coinInAmount: BigInt(coinInValue.toFixed(0)),
            externalFee: { recipient: TREASURY, feePercentage: EXCHANGE_FEE },
          })
        : hopSdk.quote(coinInType, coinOutType, coinInValue.toFixed(0))
      ).finally(() => {
        setValue('fetchingPrices', false);
      });

      setValue('route', data);

      const value = Number(
        (aggregator === Aggregator.Aftermath
          ? (FixedPointMath.toNumber(coinInValue, getValues('from.decimals')) *
              10 ** (getValues('from.decimals') - getValues('to.decimals'))) /
            (data as RouterCompleteTradeRoute).spotPrice
          : FixedPointMath.toNumber(
              BigNumber((data as JSONQuoteResponse).amount_out_with_fee),
              getValues('to.decimals')
            )
        ).toFixed(6)
      ).toPrecision();

      setValue('to.display', value);

      setValue('lastFetchDate', Date.now());
      setValue('error', null);
    },
    { refreshInterval: Number(interval) * 1000, refreshWhenOffline: false }
  );

  useEffect(() => {
    if (error) {
      resetFields();
      setValue('error', SwapMessagesEnum.noMarket);
    }
  }, [error]);

  return (
    <Button
      isIcon
      p="xs"
      bg="onPrimary"
      width="1.5rem"
      height="1.5rem"
      variant="filled"
      color="onSurface"
      borderRadius="full"
      alignItems="center"
      position="relative"
      disabled={disabled}
      nFocus={!disabled && { bg: 'lowContainer' }}
      nActive={!disabled && { bg: 'lowContainer' }}
      nHover={!disabled ? { bg: 'lowContainer' } : { bg: 'lowestContainer' }}
      nDisabled={
        disabled && {
          opacity: 1,
          color: 'onSurface',
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
        <Box as="span" display="flex" position="absolute" color="onSurface">
          <ProgressIndicator size={24} variant="loading" />
        </Box>
      ) : lastFetchDate ? (
        <Box as="span" display="flex" position="absolute" color="onSurface">
          <Countdown
            date={lastFetchDate + Number(interval) * 1000}
            renderer={countdownRenderer(interval)}
          />
        </Box>
      ) : (
        <Box as="span" display="flex" color="onSurface">
          <RefreshSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
        </Box>
      )}
    </Button>
  );
};

export default SwapUpdatePrice;
