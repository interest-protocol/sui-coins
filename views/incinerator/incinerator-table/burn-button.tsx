import { Box, Button, Dialog } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

const IncineratorBurnButton: FC = () => {
  const { setModal, handleClose } = useModal();

  const handleBurnAssets = () => {
    setModal(
      <Dialog
        title="Warning message"
        status="error"
        message="This is the warning description. It can be anything you want and as long as you want. But please don't make it too long."
        primaryButton={{
          label: 'Burn Assets',
          onClick: () => {
            handleClose();
          },
        }}
        secondaryButton={{
          label: 'Close',
          onClick: handleClose,
        }}
      />
    );
  };

  return (
    <Box py="m" display="flex" justifyContent="center">
      <Button
        type="button"
        variant="filled"
        borderRadius="xs"
        onClick={handleBurnAssets}
      >
        Burn assets
      </Button>
    </Box>
  );
};

export default IncineratorBurnButton;
