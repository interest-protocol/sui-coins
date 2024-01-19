import { Box } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import ManageSlippageForm from './manage-slippage-form';
import SlippageInfo from './slippage';

const ManageSlippage: FC = () => {
  const [openManage, setOpenManage] = useState(false);

  const handleManageView = () => setOpenManage(not);

  return (
    <Box mt="2rem">
      <Typography variant="body" size="large" mb="l">
        Manage your slippage
      </Typography>
      <Box bg="surface" display="flex" flexDirection="column" borderRadius="xs">
        <SlippageInfo isOpen={openManage} handleManageView={handleManageView} />
        {openManage && (
          <ManageSlippageForm handleManageView={handleManageView} />
        )}
      </Box>
    </Box>
  );
};

export default ManageSlippage;
