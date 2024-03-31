import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SendHistoryTabsProps } from './send-history.types';

const SendHistoryTabs: FC<SendHistoryTabsProps> = ({
  tabIndex,
  onChangeTab,
}) => (
  <Box
    display="grid"
    flexWrap="wrap"
    borderBottom="1px solid"
    borderBottomColor="container"
    gridTemplateColumns="1fr 1fr 1fr 1fr"
  >
    {['All', 'Coins', 'NFT', 'Objects'].map((item, index) => (
      <Box key={v4()} cursor="pointer" onClick={() => onChangeTab(index)}>
        <Typography variant="body" size="medium" textAlign="center" py="m">
          {item}
        </Typography>
        {tabIndex === index && (
          <Motion layout borderBottom="2px solid" borderColor="primary" />
        )}
      </Box>
    ))}
  </Box>
);

export default SendHistoryTabs;
