import { Box, Button } from '@interest-protocol/ui-kit';
import { TextField } from 'elements';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { PoolProps } from '../create-pool.types';
import PoolStatus from '../pool-status';

const CreatePoolForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<PoolProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  return (
    <Box
      borderRadius="m"
      overflow="hidden"
      bg="lowestContainer"
      height={['55rem', '55rem', '55rem', '50rem']}
      width={['100%', '100%', '100%', '26rem']}
      boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
    >
      <form>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box>1. Choose in witch DEX you want your pool</Box>
          <TextField
            label="DEX"
            {...register('name')}
            placeholder="Select dex"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
          />
        </Box>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box>2. Pool details</Box>
          <TextField
            label="Name"
            {...register('coinOwner')}
            placeholder="Eg. Leo's coin"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
          />
          <TextField
            label="Trade fee"
            {...register('tradeFee')}
            placeholder="Eg. 0.30"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
          />
          <Box>3. Coin and Initial deposit</Box>
          <TextField
            label="Select token and deposit"
            {...register('coinOwner')}
            placeholder="00"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
          />
          <TextField
            {...register('tradeFee')}
            placeholder="Eg. 0.30"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
          />
        </Box>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
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
          <Button
            py="s"
            px="xl"
            fontSize="s"
            bg="primary"
            type="submit"
            variant="filled"
            color="onPrimary"
            fontFamily="Proto"
            borderRadius="full"
            disabled={false}
          >
            Create pool
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreatePoolForm;
