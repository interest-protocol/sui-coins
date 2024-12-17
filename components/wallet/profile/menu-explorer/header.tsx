import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowLeftSVG } from '@/svg';

import MenuButton from '../../menu-button';
import { MenuSwitchAccountHeaderProps } from '../profile.types';

const MenuExplorerHeader: FC<Omit<MenuSwitchAccountHeaderProps, 'size'>> = ({
  onBack,
  handleCloseProfile,
}) => (
  <>
    <Box
      gap="xs"
      display="flex"
      color="onSurface"
      alignItems="center"
      py={['m', 'm', 'm', 'l']}
      px={['unset', 'unset', 'unset', 'l']}
      justifyContent={[
        'space-between',
        'space-between',
        'space-between',
        'unset',
      ]}
    >
      <Button
        isIcon
        variant="text"
        p="0 !important"
        onClick={onBack}
        nHover={{
          color: 'primary',
          bg: 'transparent',
        }}
      >
        <ArrowLeftSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      </Button>
      <Typography variant="title" size="small" textTransform="capitalize">
        Choose an explorer
      </Typography>
      <Box
        display={['flex', 'flex', 'flex', 'none']}
        flexDirection="row-reverse"
      >
        <MenuButton handleClose={handleCloseProfile} />
      </Box>
    </Box>
  </>
);

export default MenuExplorerHeader;
