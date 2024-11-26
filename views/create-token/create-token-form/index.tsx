import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useForm } from 'react-hook-form';

import { TextField } from '@/components';
import { parseInputEventToNumberString } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import CreateTokenButton from './create-token-button';
import { validationSchema } from './create-token-form.validation';
import FixedSupplyToggle from './fixed-supply-toggle';
import UploadImage from './upload-image';

const CreateTokenForm: FC = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTokenForm>({
    defaultValues: {
      fixedSupply: true,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  return (
    <Box
      as="form"
      mx="auto"
      width="100%"
      maxWidth="37rem"
      overflow="hidden"
      borderRadius="xs"
      bg="lowestContainer"
    >
      <form>
        <Typography variant="title" size="large" p="xl">
          Coin Generator
        </Typography>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box>1. Coin Details</Box>
          <TextField
            label="Name"
            {...register('name')}
            placeholder="Eg. Sui"
            status={errors.name && 'error'}
            supportingText={errors.name?.message}
          />
          <TextField
            maxWidth="12ch"
            label="Coin Symbol"
            placeholder="Eg. SUI"
            {...register('symbol', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value.slice(0, 12);
                setValue('symbol', value);
              },
            })}
            status={errors.symbol && 'error'}
            supportingText={errors.symbol?.message}
          />
          <TextField
            label="Description"
            {...register('description')}
            status={errors.description && 'error'}
            placeholder="Eg. Some description about the coin"
            supportingText={errors.description?.message}
          />
        </Box>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box>2. Add Coin Image</Box>
          <TextField
            type="link"
            label="Coin Image URL"
            {...register('imageUrl')}
            status={errors.imageUrl && 'error'}
            placeholder="Eg. https://sui.com/images/logo.png"
            supportingText={
              errors.imageUrl?.message ??
              'We recommend to upload an image with 250x250 pixels.'
            }
          />
          <Typography
            size="large"
            variant="body"
            opacity="0.64"
            textAlign="center"
          >
            or
          </Typography>
          <Box display="flex" flexDirection="column" gap="xs">
            <Typography as="label" size="small" variant="body">
              Upload image
            </Typography>
            <UploadImage setValue={setValue} />
          </Box>
        </Box>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box>3. Coin Features</Box>
          <TextField
            type="number"
            defaultValue="9"
            label="Coin Decimals"
            {...register('decimals')}
            status={errors.decimals?.message ? 'error' : 'success'}
            supportingText={
              errors.decimals?.message ||
              "Insert the decimal precision of your token. If you don't know what to insert, use 9"
            }
          />
          <TextField
            label="Total Supply"
            placeholder="Your total coin supply"
            status={errors.totalSupply && 'error'}
            supportingText={
              errors.totalSupply?.message ||
              'Insert the initial token supply to mint'
            }
            {...register('totalSupply', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                setValue('totalSupply', parseInputEventToNumberString(v));
              },
            })}
          />
          <Box
            p="m"
            my="xl"
            gap="m"
            bg="surface"
            display="flex"
            borderRadius="xs"
            flexDirection="column"
          >
            <FixedSupplyToggle control={control} setValue={setValue} />
          </Box>
          <CreateTokenButton
            handleSubmit={handleSubmit}
            getValues={getValues}
          />
        </Box>
      </form>
    </Box>
  );
};

export default CreateTokenForm;
