import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CogsSVG, MinusSVG } from '@/svg';

import { HeaderProps } from './swap-settings-form/swap-settings-form.types';

const Header: FC<HeaderProps> = ({ isOpen, handleManageView }) => {
  const ManageIcon = isOpen ? MinusSVG : CogsSVG;

  return (
    <Box
      py="l"
      px="2xl"
      display="flex"
      bg="onPrimary"
      borderRadius="s"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="label" size="large" fontSize="0.875rem">
        Settings
      </Typography>
      <Button isIcon variant="text" onClick={handleManageView}>
        <ManageIcon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Button>
    </Box>
  );
};

export default Header;
