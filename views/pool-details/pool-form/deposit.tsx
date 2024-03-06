import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

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

  const handleDeposit = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} isDeposit />
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
      <PoolReceiveSection symbol="LPs Coin" balance={getValues('lpCoin')} />
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
        onClick={handleDeposit}
      >
        Deposit
      </Button>
    </>
  );
};

export default PoolDeposit;
