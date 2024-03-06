import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { useDialog } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { PoolToken } from '@/views/pools/pools.types';
import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../component/field';
import { PoolFormProps } from '../component/field/field.types';
import PoolPreview from '../preview';
import Selection from './selection';

const PoolWithdraw: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { setModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dialog, handleClose } = useDialog();

  const { getValues } = useFormContext();

  const lpCoin = getValues('lpCoin') as PoolToken;

  const handleWithdraw = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 2000);
    });

  const withdraw = () => {
    dialog.promise(handleWithdraw(), {
      loading: {
        title: 'Withdrawing...',
        message:
          'We are Withdrawing, and you will let you know when it is done',
      },
      success: {
        onClose: handleClose,
        title: 'Withdraw Successfully',
        message:
          'Your withdraw was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: handleClose,
        },
      },
      error: {
        onClose: handleClose,
        title: 'Withdraw Failure',
        message:
          'Your withdrawing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

  const onSubmit = () => setIsSubmitting(not);

  useEffect(() => {
    if (isSubmitting) {
      withdraw();
      onSubmit();
    }
  }, [isSubmitting]);

  const removeLiquidity = () => {
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onSubmit} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );
  };

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Withdraw...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {[lpCoin].map((_: any, index: number) => (
          <PoolField key={v4()} index={index} poolOptionView={poolOptionView} />
        ))}
        <Selection />
      </Box>
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="container" borderRadius="xs">
          <ManageSlippage shortButton />
        </Box>
      </Box>
      <Button
        py="s"
        mt="xl"
        mx="auto"
        variant="filled"
        width="max-content"
        onClick={removeLiquidity}
      >
        Remove Liquidity
      </Button>
    </>
  );
};

export default PoolWithdraw;
