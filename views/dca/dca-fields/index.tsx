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
  const { register, getValues, setValue, control } = useFormContext<DCAForm>();

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
            border="1px solid"
            whiteSpace="nowrap"
            bg="lowestContainer"
            tooltipPosition="left"
            borderColor="outlineVariant"
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
            border="1px solid"
            whiteSpace="nowrap"
            bg="lowestContainer"
            tooltipPosition="left"
            borderColor="outlineVariant"
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
            border="1px solid"
            whiteSpace="nowrap"
            bg="lowestContainer"
            tooltipPosition="left"
            borderColor="outlineVariant"
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
              fieldProps={{
                mx: 0,
                px: 0,
                width: '100%',
                height: '3.5rem',
                borderRadius: 'xs',
              }}
              {...register('min.display', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  setValue('min.display', value);
                  setValue(
                    'min.value',
                    FixedPointMath.toBigNumber(
                      value,
                      getValues('from.decimals')
                    )
                  );
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
              fieldProps={{
                mx: 0,
                px: 0,
                width: '100%',
                height: '3.5rem',
                borderRadius: 'xs',
              }}
              {...register('max.display', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  setValue('max.display', value);
                  setValue(
                    'max.value',
                    FixedPointMath.toBigNumber(
                      value,
                      getValues('from.decimals')
                    )
                  );
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
              borderRadius="full"
              fontFamily="Satoshi"
              borderColor="outlineVariant"
              onClick={() => {
                // Set MAX fields
                setValue(
                  'max.display',
                  Number(
                    (Number(price) + Number(price) * value).toFixed(6)
                  ).toPrecision()
                );
                setValue(
                  'max.value',
                  FixedPointMath.toBigNumber(
                    Number(price) + Number(price) * value,
                    getValues('from.decimals')
                  ).decimalPlaces(0)
                );

                // Set MIN fields
                setValue(
                  'min.display',
                  Number(
                    (Number(price) - Number(price) * value).toFixed(6)
                  ).toPrecision()
                );
                setValue(
                  'min.value',
                  FixedPointMath.toBigNumber(
                    Number(price) - Number(price) * value,
                    getValues('from.decimals')
                  ).decimalPlaces(0)
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