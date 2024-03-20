import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { useDialog } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from './component/field';
import { PoolFormProps } from './component/field/field.types';
import PoolReceiveSection from './component/receive-section';
import PoolPreview from './preview';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { setModal } = useModal();
  const { getValues } = useFormContext();

  const tokenList = getValues('tokenList');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dialog, handleClose } = useDialog();

  const handleDeposit = async () => {
    setTimeout(() => {}, 2000);
  };

  const deposit = () => {
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

  const onSubmit = () => setIsSubmitting(not);

  useEffect(() => {
    if (isSubmitting) {
      deposit();
      onSubmit();
    }
  }, [isSubmitting]);

  const addDeposit = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onSubmit} isDeposit />
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
        {tokenList.map((_: any, index: number) => (
          <PoolField key={v4()} index={index} poolOptionView={poolOptionView} />
        ))}
      </Box>
      <PoolReceiveSection
        symbol="LPs Coin"
        balance={getValues('lpCoin.balance')}
      />
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="container" borderRadius="xs">
          <ManageSlippage />
        </Box>
      </Box>
      <Button
        py="s"
        mt="xl"
        mx="auto"
        variant="filled"
        width="max-content"
        onClick={addDeposit}
      >
        Deposit
      </Button>
    </>
  );
};

export default PoolDeposit;
