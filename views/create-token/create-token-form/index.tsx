import { Box, Button } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWalletKit } from '@mysten/wallet-kit';
import { TextField } from 'elements';
import { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SuiNetwork, useSuiClient } from '@/hooks/use-sui-client';
import { showTXSuccessToast } from '@/utils';
import { throwTXIfNotSuccessful } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import { getTokenByteCode } from './api';
import FixedSupplyToggle from './fixed-supply-toggle';

const CreateTokenForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, control, getValues, setValue } = useForm<ICreateTokenForm>({
    defaultValues: {
      fixedSupply: true,
    },
  });

  const { currentAccount, signTransactionBlock } = useWalletKit();
  const suiClient = useSuiClient(
    (currentAccount?.chains?.[0] as SuiNetwork) || 'sui:mainnet'
  );

  const onSubmit = async () => {
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

      const { dependencies, modules } = await getTokenByteCode({
        name,
        symbol,
        fixedSupply,
        url: imageUrl ?? '',
        decimals: decimals ?? 9,
        description: description ?? '',
        mintAmount: (
          BigInt(totalSupply) *
          10n ** BigInt(decimals ?? 9n)
        ).toString(),
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
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(
        tx,
        currentAccount.chains[0] as `${string}::${string}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () =>
    toast.promise(onSubmit(), {
      loading: 'Generating new coin...',
      success: 'Coin Generated',
      error: (e) => e.message || 'Something went wrong',
    });

  return (
    <Box
      borderRadius="m"
      overflow="hidden"
      bg="lowestContainer"
      width={['100%', '100%', '100%', '26rem']}
      boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
    >
      <Box
        p="xl"
        fontSize="l"
        borderBottom="1px solid"
        borderColor="outlineVariant"
      >
        Coin Generator
      </Box>
      <Box p="xl" display="flex" flexDirection="column" gap="m">
        <Box>1. Coin Details</Box>
        <TextField label="Name" {...register('name')} placeholder="Eg. Sui" />
        <TextField
          label="Coin Symbol"
          placeholder="Eg. SUI"
          {...register('symbol')}
        />
        <TextField
          label="Description"
          {...register('description')}
          placeholder="Eg. Some description about the coin"
        />
        <TextField
          label="Coin Image URL"
          {...register('imageUrl')}
          placeholder="Eg. https://sui.com/images/logo.png"
        />
      </Box>
      <Box p="xl" display="flex" flexDirection="column" gap="m">
        <Box>2. Coin Features</Box>
        <TextField
          status="success"
          defaultValue="9"
          label="Coin Decimals"
          {...register('decimals')}
          supportingText="Insert the decimal precision of your token. If you don't know what to insert, use 9"
        />
        <TextField
          label="Total Supply"
          {...register('totalSupply')}
          placeholder="Your total coin supply"
          supportingText="Insert the maximum number of tokens available"
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
          <Box display="flex" justifyContent="space-between" color="onSurface">
            <Box>Fixed Supply</Box>
            <FixedSupplyToggle control={control} setValue={setValue} />
          </Box>
          <Box color="#0000007A" fontSize="xs">
            The Treasury Cap will be sent to the @0x0 address
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            py="s"
            px="xl"
            fontSize="s"
            bg="primary"
            variant="filled"
            color="onPrimary"
            fontFamily="Proto"
            borderRadius="full"
            onClick={handleSubmit}
            disabled={!currentAccount || loading}
          >
            Create coin
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
