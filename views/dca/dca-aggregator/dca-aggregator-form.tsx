import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { ZERO_BIG_NUMBER } from '@/utils';

import { Aggregator, DCAAggregatorFormProps, DCAForm } from '../dca.types';
import { AGGREGATORS_LIST } from './dca-aggregator.data';

const DCAAggregatorForm: FC<DCAAggregatorFormProps> = ({
  handleManageView,
}) => {
  const { setValue, control } = useFormContext<DCAForm>();
  const [stored, setLocalAggregator] = useLocalStorage(
    `${LOCAL_STORAGE_VERSION}-suicoins-dca-aggregator`,
    Aggregator.Aftermath
  );

  const aggregator = useWatch({ control, name: 'aggregator' });

  const onConfirm = () => {
    setLocalAggregator(aggregator);

    handleManageView();
  };

  const onCancel = () => {
    setValue('aggregator', stored);

    handleManageView();
  };

  const resetFields = () => {
    setValue('to.display', '0');
    setValue('from.display', '0');
    setValue('from.value', ZERO_BIG_NUMBER);
  };

  const onSelectAggregator = (aggregator: Aggregator) => {
    setValue('aggregator', aggregator);
    resetFields();
  };
  return (
    <Box
      py="2xl"
      px="2xl"
      gap="xl"
      bg="onPrimary"
      display="flex"
      flexDirection="column"
    >
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
      <Box display="flex" gap="0.5rem" justifyContent="flex-end">
        <Button
          px="l"
          py="s"
          variant="tonal"
          borderRadius="xs"
          onClick={onCancel}
          bg="rgba(0, 0, 0, 0.08)"
        >
          Cancel
        </Button>
        <Button
          width="100%"
          variant="filled"
          borderRadius="xs"
          textAlign="center"
          onClick={onConfirm}
          justifyContent="center"
        >
          <Typography variant="label" size="large" width="100%">
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DCAAggregatorForm;
