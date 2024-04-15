import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';
import { ArrowLeftSVG, TimesSVG } from '@/svg';

import { PoolPreviewWrapperProps } from '../preview.types';

const PoolPreviewWrapperHeader: FC<
  Omit<PoolPreviewWrapperProps, 'onSubmit'>
> = ({ isDeposit }) => {
  const { handleClose } = useModal();

  return (
    <Box
      p="m"
      display="grid"
      alignItems="center"
      justifyContent="space-between"
      gridTemplateColumns="2rem auto 2rem"
    >
      <Button variant="text" isIcon onClick={handleClose} mr="-0.5rem">
        <ArrowLeftSVG maxWidth="1.5rem" maxHeight="1rem" width="100%" />
      </Button>
      <Typography variant="title" size="large">
        {isDeposit ? 'Deposit' : 'Withdraw'}
      </Typography>
      <Button variant="text" isIcon onClick={handleClose} mr="-0.5rem">
        <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      </Button>
    </Box>
  );
};

export default PoolPreviewWrapperHeader;
