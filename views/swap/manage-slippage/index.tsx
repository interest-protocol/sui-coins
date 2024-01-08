import { Box } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import ManageSlippageForm from './manage-slippage-form';
import SlippageInfo from './slippage';

const ManageSlippage: FC = () => {
  const [openManage, setOpenManage] = useState(false);

  const handleManageView = () => setOpenManage(not);

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <SlippageInfo isOpen={openManage} handleManageView={handleManageView} />
        {openManage && (
          <ManageSlippageForm handleManageView={handleManageView} />
        )}
      </Box>
    </Box>
  );
};

export default ManageSlippage;
