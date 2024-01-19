import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ConfirmSwapButtonProps } from './swap-preview-modal.types';

const ConfirmSwapButton: FC<ConfirmSwapButtonProps> = ({
  handleConfirmSwap,
}) => {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        width="100%"
        display="flex"
        variant="filled"
        borderRadius="0.5rem"
        justifyContent="center"
        onClick={handleConfirmSwap}
      >
        <Typography variant="label" size="large">
          Confirm swap
        </Typography>
      </Button>
    </Box>
  );
};

export default ConfirmSwapButton;
