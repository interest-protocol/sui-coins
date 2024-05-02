import { Box, Button, Dialog, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

import IncineratorTableBody from './table-body';
import IncineratorTableHeader from './table-header';

const IncineratorTable: FC = () => {
  const { setModal, handleClose } = useModal();

  const handleBurnAssets = () => {
    setModal(
      <Dialog
        title="Warning message"
        status="error"
        message="This is the warning description. It can be anything you want and as long as you want. But please don't make it too long."
        primaryButton={{
          label: 'Burn Assests',
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
    <Box mb="l" display="grid" gap="l">
      <Box overflowX="auto">
        <Motion
          as="table"
          rowGap="l"
          width="100%"
          mt="l"
          borderCollapse="separate"
          borderSpacing="0 0.5rem"
        >
          <IncineratorTableHeader />
          <IncineratorTableBody />
        </Motion>
        <Box py="m" display="flex" justifyContent="center">
          <Button variant="filled" borderRadius="xs" onClick={handleBurnAssets}>
            Burn assets
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default IncineratorTable;
