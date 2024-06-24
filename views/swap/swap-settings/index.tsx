import { Box } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import Header from './slippage';
import SwapSettingsForm from './swap-settings-form';
import { SwapSettingsProps } from './swap-settings-form/swap-settings-form.types';

const SwapSettings: FC<SwapSettingsProps> = ({ noAgg }) => {
  const [openManage, setOpenManage] = useState(false);

  const handleManageView = () => setOpenManage(not);

  return (
    <Box display="flex" flexDirection="column">
      <Header isOpen={openManage} handleManageView={handleManageView} />
      {openManage && (
        <SwapSettingsForm noAgg={noAgg} handleManageView={handleManageView} />
      )}
    </Box>
  );
};

export default SwapSettings;
