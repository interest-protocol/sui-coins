import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Form,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
    defaultValues: {
      fixedSupply: true,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
    <Box
      mx="auto"
      bg="container"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      width={['100%', '100%', '100%', '37rem']}
      boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box p="xl" fontSize="l">
          Coin Generator
        </Box>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box display="flex" flexDirection="column" gap="m">
            <Box>1. Coin Details</Box>
            <TextField
              label="Name"
              {...register('name')}
              placeholder="Eg. Move"
              status={errors.name && 'error'}
              supportingText={errors.name?.message}
              fieldProps={{
                borderRadius: 'xs',
                py: 'xl',
              }}
              nPlaceholder={{
                color: 'onSurface',
                opacity: 0.5,
              }}
            />
            <TextField
              label="Coin Symbol"
              placeholder="Eg. MOVE"
              {...register('symbol')}
              status={errors.symbol && 'error'}
              supportingText={errors.symbol?.message}
              fieldProps={{
                borderRadius: 'xs',
                py: 'xl',
              }}
              nPlaceholder={{
                color: 'onSurface',
                opacity: 0.5,
              }}
            />
            <TextField
              label="Description"
              {...register('description')}
              status={errors.description && 'error'}
              placeholder="Eg. Some description about the coin"
              supportingText={errors.description?.message}
              fieldProps={{
                borderRadius: 'xs',
                py: 'xl',
              }}
              nPlaceholder={{
                color: 'onSurface',
                opacity: 0.5,
              }}
            />
            <TextField
              type="link"
              label="Coin Image URL"
              {...register('imageUrl')}
              status={errors.imageUrl && 'error'}
              supportingText={errors.imageUrl?.message}
              placeholder="Eg. https://www.interestprotocol.com/logo.png"
              fieldProps={{
                borderRadius: 'xs',
                py: 'xl',
              }}
              nPlaceholder={{
                color: 'onSurface',
                opacity: 0.5,
              }}
            />
            <Typography size="large" variant="body" textAlign="center">
              or
            </Typography>
            <CreateTokenFormImage setValue={setValue} />
          </Box>
          <Box display="flex" flexDirection="column" gap="m">
            <Box>2. Coin Features</Box>
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
              fieldProps={{
                borderRadius: 'xs',
                py: 'xl',
              }}
              nPlaceholder={{
                color: 'onSurface',
                opacity: 0.5,
              }}
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
              fieldProps={{
                borderRadius: 'xs',
                py: 'xl',
              }}
              nPlaceholder={{
                color: 'onSurface',
                opacity: 0.5,
              }}
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
                fontFamily="Proto"
                borderRadius="xs"
                onClick={onSubmit}
                disabled={!currentAccount || loading}
              >
                Create coin
              </Button>
            </Box>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default CreateTokenForm;
