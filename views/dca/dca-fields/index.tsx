import {
  Box,
  Button,
  TextField,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { InfoCircleSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import { DCAForm } from '../dca.types';
import DCAPeriodicity from './dca-periodicity';

const DCAFields: FC = () => {
  const { coinsMap } = useWeb3();
  const { register, getValues, setValue, control } = useFormContext<DCAForm>();

  const fromType = useWatch({ control, name: 'from.type' });
  const fromUsd = useWatch({ control, name: 'from.usdPrice' });
  const toSymbol = useWatch({ control, name: 'to.symbol' });
  const toUsd = useWatch({ control, name: 'to.usdPrice' });
  const fromSymbol = useWatch({ control, name: 'from.symbol' });

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
              {fromUsd && toUsd
                ? `: 1 ${fromSymbol} = ${+(fromUsd / toUsd).toFixed(
                    4
                  )} ${toSymbol}`
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
          <Button
            px="xs"
            py="2xs"
            variant="outline"
            borderRadius="full"
            fontFamily="Satoshi"
            borderColor="outlineVariant"
          >
            10%
          </Button>
          <Button
            px="xs"
            py="2xs"
            variant="outline"
            borderRadius="full"
            fontFamily="Satoshi"
            borderColor="outlineVariant"
          >
            20%
          </Button>
          <Button
            px="xs"
            py="2xs"
            variant="outline"
            borderRadius="full"
            fontFamily="Satoshi"
            borderColor="outlineVariant"
          >
            30%
          </Button>
          <Button
            px="xs"
            py="2xs"
            variant="outline"
            borderRadius="full"
            fontFamily="Satoshi"
            borderColor="outlineVariant"
          >
            40%
          </Button>
          <Button
            px="xs"
            py="2xs"
            variant="outline"
            borderRadius="full"
            fontFamily="Satoshi"
            borderColor="outlineVariant"
          >
            50%
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DCAFields;
