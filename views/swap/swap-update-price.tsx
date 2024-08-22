import { QuoteSwapReturn } from '@interest-protocol/clamm-sdk';
import type {
  CoinPath,
  PoolObjectIdPath,
} from '@interest-protocol/clamm-sdk/dist/clamm/router/router.types';
import { Box, Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { COIN_TO_WRAPPED } from '@/constants/clamm';
import { EXCHANGE_FEE } from '@/constants/fees';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useHopSdk } from '@/hooks/use-hop-sdk';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';
import { RefreshSVG } from '@/svg';
import { isSui, parseBigNumberish, ZERO_BIG_NUMBER } from '@/utils';

import { SwapMessagesEnum } from './swap.data';
import { useAftermathRouter } from './swap.hooks';
import { Aggregator, SwapForm } from './swap.types';
import { isNativeRoute } from './swap.utils';

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
  const clamm = useClammSdk();
  const hopSdk = useHopSdk();
  const { coinsMap } = useWeb3();
  const network = useNetwork();
  const aftermathRouter = useAftermathRouter();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const native = getValues('settings.aggregator') === Aggregator.Interest;

  const coinInType = useWatch({
    control,
    name: 'from.type',
  });

  const from = useWatch({ control, name: 'from' });

  const fromValue = from?.value ?? ZERO_BIG_NUMBER;

  const fromBalance =
    from && coinsMap[from.type] ? coinsMap[from.type].balance : ZERO_BIG_NUMBER;

  const oneCoin = from
    ? FixedPointMath.toBigNumber(1, from.decimals)
    : ZERO_BIG_NUMBER;

  const isGreaterThanBalance = fromBalance.lt(fromValue);

  const isGreaterThanAllowedWhenSui = fromBalance.minus(oneCoin).lt(fromValue);

  const slippage = useWatch({ control, name: 'settings.slippage' });
  const aggregator = useWatch({ control, name: 'settings.aggregator' });

  const toDisplay = useWatch({
    control,
    name: 'to.display',
  });

  const fromDisplay = useWatch({
    control,
    name: 'from.display',
  });

  const [coinInValue] = useDebounce(
    useWatch({
      control,
      name: 'from.value',
    }),
    800
  );

  const [coinOutValue] = useDebounce(
    useWatch({
      control,
      name: 'to.value',
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

  const origin = useWatch({
    control,
    name: 'origin',
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
    setValue('error', null);
    setValue('lastFetchDate', null);
    setValue('fetchingPrices', false);
    setValue(`${origin === 'to' ? 'from' : 'to'}.display`, '0');
    setValue(`${origin === 'to' ? 'from' : 'to'}.value`, ZERO_BIG_NUMBER);
  };

  const disabled =
    origin === 'from'
      ? !coinInValue || coinInValue.isZero() || !coinOutType
      : !coinOutValue || coinOutValue.isZero() || !coinInType;

  const getRouterValue = (route: SwapForm['route'], aggregator: Aggregator) => {
    if (isNativeRoute(route))
      return String(
        FixedPointMath.toNumber(
          parseBigNumberish(route.routes[0][2].amount),
          getValues('to.decimals')
        )
      );

    if (aggregator === Aggregator.Aftermath)
      return origin === 'to'
        ? // TODO: review
          (
            ((FixedPointMath.toNumber(coinOutValue, getValues('to.decimals')) *
              10 ** (getValues('to.decimals') - getValues('from.decimals'))) /
              (route as RouterCompleteTradeRoute).spotPrice) *
            (1 - EXCHANGE_FEE)
          ).toPrecision(6)
        : (
            ((FixedPointMath.toNumber(coinInValue, getValues('from.decimals')) *
              10 ** (getValues('from.decimals') - getValues('to.decimals'))) /
              (route as RouterCompleteTradeRoute).spotPrice) *
            (1 - EXCHANGE_FEE)
          ).toPrecision(6);

    if (aggregator === Aggregator.Hop)
      return FixedPointMath.toNumber(
        BigNumber((route as JSONQuoteResponse).amount_out_with_fee),
        getValues('to.decimals')
      ).toPrecision(6);

    return '0';
  };

  const getRouteValue = async () => {
    try {
      if (native) {
        const route = await clamm
          .getRoutesQuotes({
            coinIn:
              COIN_TO_WRAPPED[network][normalizeStructTag(coinInType)] ||
              coinInType,
            coinOut:
              COIN_TO_WRAPPED[network][normalizeStructTag(coinOutType)] ||
              coinOutType,
            amount: BigInt(
              coinInValue.decimalPlaces(0, BigNumber.ROUND_DOWN).toString()
            ),
          })
          .then((value) => ({
            ...value,
            routes: value.routes.reduce(
              ([acc], route) => [
                acc && acc[2].amount >= route[2].amount ? acc : route,
              ],
              [] as [CoinPath, PoolObjectIdPath, QuoteSwapReturn][]
            ),
          }));

        setValue('route', route);

        return getRouterValue(route, Aggregator.Interest);
      }

      const getAggregatorRouter = (argument: Aggregator) => {
        if (argument === Aggregator.Aftermath)
          return origin === 'to'
            ? aftermathRouter.getCompleteTradeRouteGivenAmountOut({
                coinInType,
                coinOutType,
                referrer: TREASURY,
                slippage: Number(slippage),
                coinOutAmount: BigInt(coinOutValue.toFixed(0)),
                externalFee: {
                  recipient: TREASURY,
                  feePercentage: EXCHANGE_FEE,
                },
              })
            : aftermathRouter.getCompleteTradeRouteGivenAmountIn({
                coinInType,
                coinOutType,
                referrer: TREASURY,
                coinInAmount: BigInt(coinInValue.toFixed(0)),
                externalFee: {
                  recipient: TREASURY,
                  feePercentage: EXCHANGE_FEE,
                },
              });
        if (argument === Aggregator.Hop)
          return hopSdk.quote(coinInType, coinOutType, coinInValue.toFixed(0));

        return;
      };

      const route = await getAggregatorRouter(aggregator!);

      setValue('route', route!);

      return getRouterValue(route!, aggregator!);
    } catch (e) {
      resetFields();
      setValue('error', 'There is no market for these coins.');

      throw e;
    } finally {
      setValue('fetchingPrices', false);
    }
  };

  useEffect(() => {
    if (origin === 'from' && (!coinInValue || coinInValue.isZero())) {
      setValue('to.display', '0');
      setValue('to.value', ZERO_BIG_NUMBER);
    }
    if (origin === 'to' && (!coinOutValue || coinOutValue.isZero())) {
      setValue('from.display', '0');
      setValue('from.value', ZERO_BIG_NUMBER);
    }
  }, [coinInValue, toDisplay, coinOutValue, fromDisplay]);

  const { mutate, error } = useSWR(
    `${origin === 'to' ? coinOutType : coinInType}-${
      origin === 'to' ? coinInType : coinOutType
    }-${
      origin === 'to' ? coinOutValue?.toString() : coinInValue?.toString()
    }-${network}-${aggregator}`,
    async () => {
      if (disabled) {
        resetFields();
        return;
      }

      if (swapping) return;

      setValue('error', null);

      if (
        origin === 'from' &&
        from &&
        Number(from.value) &&
        from.type &&
        String(from.decimals) &&
        coinsMap[from.type]
      ) {
        if (isGreaterThanBalance) {
          setValue('error', SwapMessagesEnum.notEnoughToken);
          return;
        }
        if (isSui(from.type) && isGreaterThanAllowedWhenSui) {
          setValue('error', SwapMessagesEnum.leastOneSui);
          return;
        }
      }

      setValue('fetchingPrices', true);

      const value = await getRouteValue();

      setValue(
        `${origin === 'to' ? 'from' : 'to'}.display`,
        FixedPointMath.toBigNumber(value, 0).toString()
      );

      setValue(
        `${origin === 'to' ? 'from' : 'to'}.value`,
        FixedPointMath.toBigNumber(
          value,
          getValues(`${origin ? 'from' : 'to'}.decimals`)
        )
      );
      setValue('lastFetchDate', Date.now());

      return;
    },
    { refreshInterval: Number(interval) * 1000, refreshWhenOffline: false }
  );

  useEffect(() => {
    if (error) {
      resetFields();
      setValue('route', null);
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
