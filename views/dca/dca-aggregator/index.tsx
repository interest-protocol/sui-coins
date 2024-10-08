import { Box } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import DCAAggregatorForm from './dca-aggregator-form';
import Header from './dca-aggregator-header';

const DCAAggregator: FC = () => {
  const [openManager, setOpenManage] = useState(false);

  return null;

  const handleManageView = () => setOpenManage(not);

  return (
    <Box display="flex" flexDirection="column">
      <Header isOpen={openManager} handleManageView={handleManageView} />
      {openManager && <DCAAggregatorForm handleManageView={handleManageView} />}
    </Box>
  );
};

export default DCAAggregator;
