import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDialog } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
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

  const handleWithdraw = async () => {
    setTimeout(() => {}, 2000);
  };

  const withdraw = () => {
    dialog.promise(handleWithdraw(), {
      loading: {
        title: 'Withdrawing...',
        message:
          'We are Withdrawing, and you will let you know when it is done',
      },
      success: {
        title: 'Withdraw Successfully',
        message:
          'Your withdraw was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: handleClose,
        },
      },
      error: {
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
        <PoolField index={0} poolOptionView={poolOptionView} />
        <Selection />
      </Box>
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
        onClick={removeLiquidity}
      >
        Remove Liquidity
      </Button>
    </>
  );
};

export default PoolWithdraw;
