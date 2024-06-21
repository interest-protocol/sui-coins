import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { values } from 'ramda';
import { FC } from 'react';
import {
  Control,
  useFormContext,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { v4 } from 'uuid';

import { ZERO_BIG_NUMBER } from '@/utils';

import { AGGREGATORS_LIST } from '../../swap.data';
import {
  Aggregator,
  AggregatorProps,
  ISwapSettings,
  SwapForm,
} from '../../swap.types';

const SwapAggregatorManager: FC<{
  control: Control<ISwapSettings>;
  setValue: UseFormSetValue<ISwapSettings>;
}> = ({ control, setValue }) => {
  const swapForm = useFormContext<SwapForm>();
  const { aggregator, bestPrice } = useWatch({ control });

  const resetFields = () => {
    swapForm.setValue('to.display', '0');
    swapForm.setValue('from.display', '0');
    swapForm.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const onSelectBestPrice = () => {
    setValue('bestPrice', true);
    setValue('aggregator', null);
    resetFields();
  };

  const onSelectAggregator = (aggregator: Aggregator) => {
    setValue('aggregator', aggregator);
    setValue('bestPrice', false);
    resetFields();
  };

  return (
    <Box display="flex" flexWrap="wrap" gap="s">
      <Button
        cursor="pointer"
        borderColor="outlineVariant"
        variant={bestPrice ? 'tonal' : 'outline'}
        onClick={() => !bestPrice && onSelectBestPrice()}
      >
        <Box>
          <Typography size="large" variant="body" textTransform="capitalize">
            Best Price
          </Typography>
          <Typography
            size="small"
            variant="body"
            color="outline"
            textTransform="capitalize"
          >
            Recommended
          </Typography>
        </Box>
      </Button>
      {values(AGGREGATORS_LIST).map((data: AggregatorProps) => (
        <Button
          py="xs"
          pl="xs"
          pr="m"
          key={v4()}
          cursor="pointer"
          disabled={data.disabled}
          borderColor="outlineVariant"
          PrefixIcon={
            <Box width="2.8rem" height="2.8rem">
              <img
                width="100%"
                height="100%"
                src={data.logo}
                alt={data.name}
                style={{ borderRadius: '0.5rem' }}
              />
            </Box>
          }
          variant={!bestPrice && data.key === aggregator ? 'tonal' : 'outline'}
          onClick={() =>
            !(data.disabled || (!bestPrice && data.key === aggregator)) &&
            onSelectAggregator(data.key)
          }
        >
          <Box>
            <Typography size="large" variant="body" textTransform="capitalize">
              {data.name}
            </Typography>
            {data.info && (
              <Typography
                size="small"
                variant="body"
                color="outline"
                textTransform="capitalize"
              >
                {data.info}
              </Typography>
            )}
          </Box>
        </Button>
      ))}
    </Box>
  );
};

export default SwapAggregatorManager;
