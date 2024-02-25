import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import useEventListener from '@/hooks/use-event-listener';

import ActionGroup from './action-group';
import { HeaderProps } from './header.types';
import SearchMobile from './search-mobile';

const Header: FC<HeaderProps> = ({ currentTab, setTab }) => {
  const [showSearchField, setShowSearchField] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCloseSearch = () => setShowSearchField(not);

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 65em)').matches;
    !mediaIsMobile && setShowSearchField(false);
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      overflowX="auto"
      overflowY="hidden"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        p="xs"
        gap="s"
        width="100%"
        flexWrap="wrap"
        overflowX="auto"
        overflowY="hidden"
        justifyContent="space-between"
        display={isMobile ? (showSearchField ? 'none' : 'flex') : 'flex'}
      >
        <Tabs
          type="circle"
          onChangeTab={setTab}
          defaultTabIndex={currentTab}
          items={['Pools', 'My Position'].map((tab) => (
            <Typography
              key={v4()}
              variant="label"
              size={isMobile ? 'small' : 'medium'}
            >
              {tab}
            </Typography>
          ))}
        />
        <ActionGroup showSearchView={handleCloseSearch} />
      </Box>
      <SearchMobile
        handleClose={handleCloseSearch}
        showSearchView={showSearchField}
      />
    </Box>
  );
};

export default Header;
