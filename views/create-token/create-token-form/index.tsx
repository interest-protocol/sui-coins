import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Form, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TextField } from '@/components';
import { useNetwork } from '@/context/network';
import {
  parseInputEventToNumberString,
  showTXSuccessToast,
  signAndExecute,
} from '@/utils';
import { throwTXIfNotSuccessful } from '@/utils';

import { useCreateToken } from '../create-token.hooks';
import { ICreateTokenForm } from '../create-token.types';
import { logCreateToken } from '../create-token.utils';
import { validationSchema } from './create-token-form.validation';
import CreateTokenFormImage from './create-token-form-image';
import CreateTokenFormToggle from './create-token-form-toggle';

const CreateTokenForm: FC = () => {
  const createToken = useCreateToken();
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTokenForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { fixedSupply: true },
    resolver: yupResolver(validationSchema),
  });

  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  const handleCreateToken = async () => {
    try {
      setLoading(true);

      if (!currentAccount) return;

      const txb = await createToken(getValues());

      const tx = await signAndExecute({
        txb,
        suiClient,
        currentAccount,
        signTransactionBlock,
      });

      throwTXIfNotSuccessful(tx);

      showTXSuccessToast(tx, network);

      logCreateToken(
        currentAccount.address,
        getValues('symbol'),
        getValues('totalSupply'),
        network,
        tx.digest
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const loading = toast.loading('Generating new coin...');
    try {
      await handleCreateToken();
      toast.success('Coin Generated!');
    } catch (e) {
      toast.error((e as Error).message || 'Something went wrong');
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <Form
      as="form"
      mx="auto"
      width="100%"
      bg="container"
      maxWidth="37rem"
      overflow="hidden"
      borderRadius="xs"
      color="onSurface"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          label="Coin Symbol"
          placeholder="Eg. SUI"
          {...register('symbol')}
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
          <CreateTokenFormImage setValue={setValue} />
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
          <CreateTokenFormToggle control={control} setValue={setValue} />
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
            borderRadius="xs"
            fontFamily="Proto"
            disabled={!currentAccount || loading}
          >
            Create coin
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default CreateTokenForm;
