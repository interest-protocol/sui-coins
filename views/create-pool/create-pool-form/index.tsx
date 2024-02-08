import {
  Box,
  Button,
  Form,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { IPoolForm } from '../create-pool.types';
import PoolStatus from '../pool-status';
import CreatePoolFormSelectDex from './create-pool-form-select-dex';
import CreatePoolFormSelectToken from './create-pool-form-select-token';

const CreatePoolForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IPoolForm>();

  return (
    <Form
      p="xl"
      gap="l"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="0.5rem"
      overflow="hidden"
      maxWidth={['100%', '100%', '100%', '100%', '32.75rem']}
      bg="lowestContainer"
      flexDirection="column"
      boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
    >
      <Box display="flex" flexDirection="column" gap="4xl">
        <Box display="flex" flexDirection="column">
          <Typography variant="body" size="large" pb="xl">
            1. Choose in which DEX you want your pool
          </Typography>
          <CreatePoolFormSelectDex />
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body" size="large" pb="xl">
            2. Pool details
          </Typography>
          <TextField
            label="Name"
            {...register('name')}
            placeholder="Eg. Leo's coin"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
            fieldProps={{ borderRadius: 'xs', mt: '2xs', mb: 'l' }}
          />
          <TextField
            label="Trade fee"
            {...register('tradeFee')}
            placeholder="Eg. 0.30"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
            fieldProps={{ borderRadius: 'xs', mt: '2xs' }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body" size="large" pb="xl">
            3. Coin and Initial deposit
          </Typography>
          <TextField
            textAlign="right"
            placeholder="000"
            {...register('tokenA.value')}
            label="Select token & deposit"
            status={errors.tokenA && 'error'}
            supportingText={errors.tokenA?.message}
            Prefix={<CreatePoolFormSelectToken name="tokenA" />}
            fieldProps={{
              mt: '2xs',
              height: '3.6rem',
              borderRadius: 'xs',
            }}
          />
          <TextField
            textAlign="right"
            placeholder="000"
            {...register('tokenB.value')}
            status={errors.tokenB && 'error'}
            supportingText={errors.tokenB?.message}
            Prefix={<CreatePoolFormSelectToken name="tokenB" />}
            fieldProps={{
              mt: 'm',
              height: '3.6rem',
              borderRadius: 'xs',
            }}
          />
        </Box>
        <PoolStatus
          lines={[
            {
              description: 'Pool size',
              amount: 0.34,
              type: 'coins',
            },
            {
              description: 'Pool creation fee',
              amount: 0.43,
              type: 'Sui',
            },
          ]}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button type="submit" variant="filled">
          Create pool
        </Button>
      </Box>
    </Form>
  );
};

export default CreatePoolForm;
