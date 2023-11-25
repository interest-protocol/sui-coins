import { Box, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import ManageSlippageForm from './manage-slippage-form';
import { ManageSlippageProps } from './manage-slippage-form.types';
import SlippageInfo from './slippage';

const ManageSlippage: FC<Omit<ManageSlippageProps, 'handleManageView'>> = ({
  formSettings,
}) => {
  const [openManage, setOpenManage] = useState(false);

  const handleManageView = () => setOpenManage(not);

  return (
    <Box mt="2rem">
      <Typography variant="body" size="large" mb="l">
        Manage your slippage
      </Typography>
      <Box
        bg="surface"
        display="flex"
        flexDirection="column"
        borderRadius="0.5rem"
      >
        <SlippageInfo
          isOpen={openManage}
          formSettings={formSettings}
          handleManageView={handleManageView}
        />
        {openManage && (
          <ManageSlippageForm
            formSettings={formSettings}
            handleManageView={handleManageView}
          />
        )}
      </Box>
    </Box>
  );
};

export default ManageSlippage;
