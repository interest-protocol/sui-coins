import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSignTransactionBlock } from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { useDialog, useMovementClient, useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';
import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../components/field';
import { PoolFormProps } from '../components/field/field.types';
import PoolReceiveSection from '../components/receive-section';
import PoolPreview from '../pool-form-preview';
import { useDeposit } from './pool-form-deposit.hooks';
import DepositManager from './pool-form-deposit-manager';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  const network = useNetwork();
  const deposit = useDeposit();
  const { coinsMap } = useWeb3();
  const { setModal } = useModal();
  const client = useMovementClient();
  const account = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const signTransactionBlock = useSignTransactionBlock();
  const { getValues, control } = useFormContext<PoolForm>();

  const { fields } = useFieldArray({ control, name: 'tokenList' });

  const handleDeposit = async () => {
    try {
      if (!account) return;

      const txb = deposit(getValues(), account);

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: account,
        });

      const tx = await client.executeTransactionBlock({
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
        transactionBlock: transactionBlockBytes,
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally');
    }
  };

  const onDeposit = () => {
    dialog.promise(handleDeposit(), {
      loading: {
        title: 'Depositing...',
        message: 'We are Depositing, and you will let you know when it is done',
      },
      success: {
        title: 'Deposit Successfully',
        message:
          'Your deposit was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: handleClose,
        },
      },
      error: {
        title: 'Deposit Failure',
        message:
          'Your deposiing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

  const disabled = getValues('tokenList').some(
    ({ value, type, decimals }) =>
      !Number(value) ||
      coinsMap[type].balance.lt(FixedPointMath.toBigNumber(value, decimals))
  );

  const addDeposit = () =>
    !disabled &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onDeposit} isDeposit />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {fields.length
          ? fields.map(({ id }, index) => (
              <PoolField
                key={id}
                index={index}
                poolOptionView={poolOptionView}
              />
            ))
          : [
              <PoolField
                key={v4()}
                index={0}
                poolOptionView={poolOptionView}
              />,
              <PoolField
                key={v4()}
                index={1}
                poolOptionView={poolOptionView}
              />,
            ]}
      </Box>
      <PoolReceiveSection />
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="lowestContainer" borderRadius="xs">
          <ManageSlippage />
        </Box>
      </Box>
      <Button
        py="s"
        mt="xl"
        mx="auto"
        variant="filled"
        width="max-content"
        disabled={disabled}
        onClick={addDeposit}
      >
        Deposit
      </Button>
      <DepositManager />
    </>
  );
};

export default PoolDeposit;
