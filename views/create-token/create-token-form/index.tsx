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
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useNetwork } from '@/context/network';
import { getBytecode } from '@/lib/move-template/coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { parseInputEventToNumberString, showTXSuccessToast } from '@/utils';
import { throwTXIfNotSuccessful } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import { Blacklist } from './blacklist';
import { validationSchema } from './create-token-form.validation';
import FixedSupplyToggle from './fixed-supply-toggle';
import UploadImage from './upload-image';

const CreateTokenForm: FC = () => {
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

  const suiClient = useSuiClient();
  const network = useNetwork();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  const createToken = async () => {
    try {
      setLoading(true);

      if (!currentAccount) return;

      const { name, symbol } = getValues();

      if (
        Blacklist.includes(name.toUpperCase().trim()) ||
        Blacklist.includes(symbol.toUpperCase().trim())
      ) {
        throw new Error('Nice try :)');
      }

      await initMoveByteCodeTemplate('/move_bytecode_template_bg.wasm');

      const txb = new TransactionBlock();

      const [upgradeCap] = txb.publish({
        modules: [
          [
            ...getBytecode({
              ...getValues(),
              recipient: currentAccount.address,
            }),
          ],
        ],
        dependencies: [normalizeSuiAddress('0x1'), normalizeSuiAddress('0x2')],
      });

      txb.transferObjects([upgradeCap], txb.pure(currentAccount.address));

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: currentAccount,
        });

      const tx = await suiClient.executeTransactionBlock({
        signature,
        transactionBlock: transactionBlockBytes,
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx);

      showTXSuccessToast(tx, network);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const loading = toast.loading('Generating new coin...');
    try {
      await createToken();
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
            <UploadImage setValue={setValue} />
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
              <FixedSupplyToggle control={control} setValue={setValue} />
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
