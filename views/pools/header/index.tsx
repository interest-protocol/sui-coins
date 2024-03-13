import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import ActionGroup from './action-group';
import { HeaderProps } from './header.types';

const Header: FC<HeaderProps> = ({ currentTab, setTab }) => (
  <Box
    display="flex"
    flexWrap="wrap"
    overflowX="auto"
    overflowY="hidden"
    alignItems="center"
    justifyContent="space-between"
  >
    <Box
      gap="s"
      width="100%"
      flexWrap="wrap"
      overflowX="auto"
      overflowY="hidden"
      justifyContent="space-between"
      display={'flex'}
    >
      <Tabs
        type="square"
        onChangeTab={setTab}
        defaultTabIndex={currentTab}
        items={['Pools', 'My Position'].map((tab) => (
          <Typography key={v4()} variant="label" size="medium">
            {tab}
          </Typography>
        ))}
      />
      <ActionGroup />
    </Box>
  </Box>
);

export default Header;
