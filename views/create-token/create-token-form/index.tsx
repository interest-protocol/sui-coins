import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useNetwork } from '@/context/network';
import { useMovementClient } from '@/hooks';
import { parseInputEventToNumberString, showTXSuccessToast } from '@/utils';
import { throwTXIfNotSuccessful } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import { getTokenByteCode } from './api';
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

  const { network } = useNetwork();
  const suiClient = useMovementClient();
  const { currentAccount, signTransactionBlock } = useWalletKit();

  const createToken = async () => {
    try {
      setLoading(true);

      if (!currentAccount) return;

      const {
        decimals,
        name,
        fixedSupply,
        totalSupply,
        symbol,
        imageUrl,
        description,
      } = getValues();

      if (
        Blacklist.includes(name.toUpperCase().trim()) ||
        Blacklist.includes(symbol.toUpperCase().trim())
      ) {
        throw new Error('Nice try :)');
      }

      const { dependencies, modules } = await getTokenByteCode({
        name,
        symbol,
        fixedSupply,
        url: imageUrl ?? '',
        decimals: decimals ?? 9,
        description: description ?? '',
        mintAmount: BigNumber(totalSupply)
          .multipliedBy(BigNumber(10).pow(decimals ? decimals : 9))
          .toString(),
      });

      const txb = new TransactionBlock();

      const [upgradeCap] = txb.publish({ modules, dependencies });

      txb.transferObjects([upgradeCap], txb.pure(currentAccount.address));

      const { signature, transactionBlockBytes } = await signTransactionBlock({
        transactionBlock: txb,
        account: currentAccount,
      });

      const tx = await suiClient.executeTransactionBlock({
        signature,
        transactionBlock: transactionBlockBytes,
        requestType: 'WaitForEffectsCert',
        options: {
          showEffects: true,
        },
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    await toast
      .promise(createToken(), {
        loading: 'Generating new coin...',
        success: 'Coin Generated',
        error: (e) => e.message || 'Something went wrong',
      })
      .catch(console.log);
  };

  return (
    <Box
      borderRadius="m"
      overflow="hidden"
      bg="lowestContainer"
      width={['100%', '100%', '100%', '26rem']}
      boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          p="xl"
          fontSize="l"
          borderBottom="1px solid"
          borderColor="outlineVariant"
        >
          Coin Generator
        </Box>
        <Box p="xl" display="flex" flexDirection="column" gap="m">
          <Box display="flex" flexDirection="column" gap="m">
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
            <TextField
              type="link"
              label="Coin Image URL"
              {...register('imageUrl')}
              status={errors.imageUrl && 'error'}
              supportingText={errors.imageUrl?.message}
              placeholder="Eg. https://sui.com/images/logo.png"
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
                fontFamily="Proto"
                borderRadius="full"
                disabled={!currentAccount || loading}
              >
                Create coin
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateTokenForm;
