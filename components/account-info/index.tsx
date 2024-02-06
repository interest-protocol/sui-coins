import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import MenuMobile from '../wallet/menu-mobile';
import Profile from '../wallet/profile';

const AccountInfo: FC = () => {
  return (
    <Box position="relative" display="flex" gap="s">
      <Profile />
      <Box display={['flex', 'flex', 'flex', 'none']}>
        <MenuMobile />
      </Box>
    </Box>
  );
};

export default AccountInfo;
