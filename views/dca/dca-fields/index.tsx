import {
  Box,
  Tag,
  TextField,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { ChangeEvent, FC, useState } from 'react';
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

  const [activeTag, setActiveTag] = useState<number | null>(null);

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
          {...register('orders', {
            onChange: (e) => setValue('orders', Math.floor(e.target.value)),
          })}
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
        <Box display="grid" gap="s" gridTemplateColumns="1fr 1fr">
          <Box width="100%">
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
              {...register('intervals', {
                onChange: (e) =>
                  setValue('intervals', Math.floor(e.target.value)),
              })}
            />
          </Box>
          <DCAPeriodicity />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="xs">
        <Box gap="xs" display="flex" alignItems="center">
          <Typography variant="label" size="medium" fontSize="s">
            SLIPPAGE
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
        <Box display="flex" gap="s" flex="1" flexDirection="column">
          <Box
            gap="xs"
            flex="1"
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
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
          </Box>
          <Box display="flex" gap="xs" flex="1">
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
        <Box display="flex" gap={['xs', 'xs', 'xs', 'm']}>
          {[0.1, 0.2, 0.3, 0.4, 0.5].map((value, index) => (
            <Tag
              py="2xs"
              key={v4()}
              size="small"
              variant="outline"
              disabled={!price}
              {...(activeTag === index && {
                color: '#0053DB',
                borderColor: '#0053DB',
                background: '#0053DB14',
              })}
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

                setActiveTag(index);
              }}
            >
              {value * 100}%
            </Tag>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DCAFields;
