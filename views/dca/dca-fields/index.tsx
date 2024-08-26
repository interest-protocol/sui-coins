import {
  Box,
  Button,
  TextField,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { InfoCircleSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import { DCAForm } from '../dca.types';
import DCAPeriodicity from './dca-periodicity';

const DCAFields: FC = () => {
  const { coinsMap } = useWeb3();
  const {
    register,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<DCAForm>();

  const toSymbol = getValues('to.symbol');
  const fromSymbol = getValues('from.symbol');
  const price = useWatch({ control, name: 'price' });
  const fromType = useWatch({ control, name: 'from.type' });

  return (
    <Box gap="l" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" gap="xs">
        <Box
          gap="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="label" size="medium" fontSize="s">
            Amount
          </Typography>
          <TooltipWrapper
            bg="onSurface"
            whiteSpace="nowrap"
            tooltipPosition="left"
            color="lowestContainer"
            tooltipContent="Quantity of orders"
          >
            <InfoCircleSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </TooltipWrapper>
        </Box>
        <TextField
          min="1"
          width="100%"
          type="number"
          lineHeight="l"
          placeholder="0"
          color="onSurface"
          fontFamily="Satoshi"
          supportingText={errors.orders?.message}
          status={errors.orders?.message ? 'error' : undefined}
          Suffix={
            <Typography variant="body" size="large">
              Orders
            </Typography>
          }
          fieldProps={{
            mx: 0,
            px: 0,
            width: '100%',
            height: '3.5rem',
            borderRadius: 'xs',
          }}
          {...register('orders')}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="xs">
        <Box
          gap="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="label" size="medium" fontSize="s">
            Frequency
          </Typography>
          <TooltipWrapper
            bg="onSurface"
            whiteSpace="nowrap"
            tooltipPosition="left"
            color="lowestContainer"
            tooltipContent="Quantity of orders"
          >
            <InfoCircleSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </TooltipWrapper>
        </Box>
        <Box display="flex" gap="s" flex="1">
          <TextField
            min="1"
            width="100%"
            type="number"
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            fontFamily="Satoshi"
            supportingText={errors.intervals?.message}
            status={errors.intervals?.message ? 'error' : undefined}
            fieldProps={{
              mx: 0,
              px: 0,
              width: '100%',
              height: '3.5rem',
              borderRadius: 'xs',
            }}
            {...register('intervals')}
          />
          <DCAPeriodicity />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="xs">
        <Box gap="xs" display="flex" alignItems="center">
          <Typography variant="label" size="medium" fontSize="s">
            Enable pricing strategy
          </Typography>
          <TooltipWrapper
            bg="onSurface"
            whiteSpace="nowrap"
            tooltipPosition="left"
            color="lowestContainer"
            tooltipContent="Quantity of orders"
          >
            <InfoCircleSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </TooltipWrapper>
        </Box>
        <Box display="flex" gap="s" flex="1">
          <Box display="flex" flexDirection="column" gap="xs" flex="1">
            <Typography variant="label" size="small" fontSize="xs">
              Balance:{' '}
              {fromType && coinsMap[fromType]
                ? FixedPointMath.toNumber(
                    coinsMap[fromType].balance,
                    coinsMap[fromType].decimals
                  )
                : 0}{' '}
              {fromSymbol}
            </Typography>
            <TextField
              min="1"
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              fontFamily="Satoshi"
              supportingText={errors.min?.message}
              status={errors.min?.message ? 'error' : undefined}
              fieldProps={{
                mx: 0,
                px: 0,
                width: '100%',
                height: '3.5rem',
                borderRadius: 'xs',
              }}
              {...register('min', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  setValue('min', value);
                },
              })}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="xs" flex="1">
            <Typography
              size="small"
              fontSize="xs"
              variant="label"
              textAlign="right"
            >
              Price
              {price
                ? `: 1 ${fromSymbol} = ${+(+price).toFixed(4)} ${toSymbol}`
                : ''}
            </Typography>
            <TextField
              min="1"
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              fontFamily="Satoshi"
              supportingText={errors.max?.message}
              status={errors.max?.message ? 'error' : undefined}
              fieldProps={{
                mx: 0,
                px: 0,
                width: '100%',
                height: '3.5rem',
                borderRadius: 'xs',
              }}
              {...register('max', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  setValue('max', value);
                },
              })}
            />
          </Box>
        </Box>
        <Box display="flex" gap="m">
          {[0.1, 0.2, 0.3, 0.4, 0.5].map((value) => (
            <Button
              px="xs"
              py="2xs"
              key={v4()}
              variant="outline"
              disabled={!price}
              borderRadius="full"
              fontFamily="Satoshi"
              borderColor="outlineVariant"
              onClick={() => {
                if (!price) return;

                const decimals = getValues('to.decimals');

                setValue(
                  'max',
                  Number(
                    (Number(price) + Number(price) * value).toFixed(decimals)
                  ).toPrecision()
                );

                setValue(
                  'min',
                  Number(
                    (Number(price) - Number(price) * value).toFixed(decimals)
                  ).toPrecision()
                );
              }}
            >
              {value * 100}%
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DCAFields;
