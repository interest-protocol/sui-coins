import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { ZERO_BIG_NUMBER } from '@/utils';

import { AGGREGATORS_LIST } from '../../swap.data';
import { Aggregator, SwapForm } from '../../swap.types';
import { SwapAggregatorManagerProps } from './swap-settings-form.types';

const SwapAggregatorManager: FC<SwapAggregatorManagerProps> = ({
  control,
  setValue,
}) => {
  const swapForm = useFormContext<SwapForm>();
  const aggregator = useWatch({ control, name: 'aggregator' });

  const resetFields = () => {
    swapForm.setValue('to.display', '0');
    swapForm.setValue('from.display', '0');
    swapForm.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const onSelectAggregator = (aggregator: Aggregator) => {
    setValue('aggregator', aggregator);
    resetFields();
  };

  return (
    <Box display="flex" flexWrap="wrap" gap="s">
      {values(AGGREGATORS_LIST).map(({ disabled, name, key, Icon }) => (
        <Button
          py="xs"
          pl="xs"
          pr="m"
          key={v4()}
          cursor="pointer"
          disabled={disabled}
          borderColor="outlineVariant"
          PrefixIcon={
            <Icon maxHeight="2.8rem" maxWidth="2.8rem" width="100%" />
          }
          variant={key === aggregator ? 'tonal' : 'outline'}
          onClick={() =>
            !(disabled || key === aggregator) && onSelectAggregator(key)
          }
        >
          <Typography size="large" variant="body" textTransform="capitalize">
            {name}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default SwapAggregatorManager;
