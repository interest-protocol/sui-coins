import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Form, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress, SUI_TYPE_ARG } from '@mysten/sui/utils';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TextField } from '@/components';
import { Network } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { getBytecode } from '@/lib/move-template/coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import {
  parseInputEventToNumberString,
  showTXSuccessToast,
  waitForTx,
} from '@/utils';
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
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { coinsMap, mutate } = useWeb3();

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

      const tx = new Transaction();

      tx.setGasPayment(
        coinsMap[SUI_TYPE_ARG].objects.map(
          ({ coinObjectId, digest, version }) => ({
            objectId: coinObjectId,
            digest: digest!,
            version: version!,
          })
        )
      );

      const [upgradeCap] = tx.publish({
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

      tx.transferObjects([upgradeCap], tx.pure.address(currentAccount.address));

      const { signature, bytes } = await signTransaction.mutateAsync({
        transaction: tx,
        account: currentAccount,
      });

      const tx2 = await suiClient.executeTransactionBlock({
        signature,
        transactionBlock: bytes,
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx2);

      showTXSuccessToast(tx2, network as Network);

      await waitForTx({ suiClient, digest: tx2.digest });

      await mutate();
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
    <Form
      as="form"
      mx="auto"
      width="100%"
      maxWidth="37rem"
      overflow="hidden"
      borderRadius="xs"
      bg="lowestContainer"
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
