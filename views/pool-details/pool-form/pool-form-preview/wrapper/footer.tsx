import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useModal } from '@/hooks/use-modal';
import PoolCardTrade from '@/views/pools/pool-card/pool-card-trade';

import { PoolPreviewWrapperProps } from '../preview.types';

const PoolPreviewWrapperFooter: FC<PoolPreviewWrapperProps> = ({
  fees,
  onSubmit,
  isDeposit,
}) => {
  const { handleClose } = useModal();

  console.log({ fees });

  return (
    <Box>
      <Box px="m" py="xs" bg="surface" borderRadius="1rem">
        <PoolCardTrade
          isInfo
          index={0}
          key={v4()}
          amount=""
          tooltipInfo=""
          description="Slippage Loss (incl. pricing):"
        />
        <PoolCardTrade
          isInfo
          index={0}
          key={v4()}
          description="Network Fee"
          tooltipInfo="Gas estimation"
          amount={
            fees.isLoading ? (
              <Box as="span" mt="-2rem" display="inline-block">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
            ) : (
              fees.data?.[0] ?? '--'
            )
          }
        />
      </Box>
      <Button
        variant="filled"
        my="xl"
        width="fill-available"
        onClick={async () => {
          await onSubmit();
          handleClose();
        }}
      >
        <Typography
          variant="label"
          size="large"
          textAlign="center"
          width="100%"
        >
          {`Confirm ${isDeposit ? 'Deposit' : 'Withdraw'}`}
        </Typography>
      </Button>
    </Box>
  );
};

export default PoolPreviewWrapperFooter;
