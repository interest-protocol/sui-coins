import { Box, Tabs } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useCallback, useState } from 'react';

import useEventListener from '@/hooks/use-event-listener';

import ActionGroup from './action-group';
import { HeaderProps } from './header.types';
import SearchMobile from './search-mobile';

const Header: FC<HeaderProps> = ({ handleOptionTab, currentOption }) => {
  const [showSearchField, setShowSearchField] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCloseSearch = () => setShowSearchField(not);
  const gotoPool = () => console.log('>>>Goto Pool');

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 65em)').matches;
    !mediaIsMobile && setShowSearchField(false);
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  return (
    <Box
      p="xs"
      gap="s"
      display="flex"
      overflowX="auto"
      overflowY="hidden"
      justifyContent="space-between"
    >
      <Box
        p="xs"
        width="100%"
        overflowX="auto"
        overflowY="hidden"
        justifyContent="space-between"
        display={isMobile ? (showSearchField ? 'none' : 'flex') : 'flex'}
      >
        <Box>
          <Tabs
            type="circle"
            onChangeTab={handleOptionTab}
            items={['Pool', 'My position']}
            defaultTabIndex={currentOption}
          />
        </Box>
        <ActionGroup showSearchView={handleCloseSearch} gotoPool={gotoPool} />
      </Box>
      <SearchMobile
        handleClose={handleCloseSearch}
        showSearchView={showSearchField}
      />
    </Box>
  );
};
export default Header;
