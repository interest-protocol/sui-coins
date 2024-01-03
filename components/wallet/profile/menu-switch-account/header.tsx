import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowLeftSVG, TimesSVG } from '@/svg';

import { MenuSwitchAccountHeaderProps } from '../profile.types';

const MenuSwitchAccountHeader: FC<MenuSwitchAccountHeaderProps> = ({
  onBack,
  handleCloseProfile,
  size,
}) => {
  return (
    <>
      <Box
        py={['l', 'l', 'l', 'xl']}
        px={['unset', 'unset', 'unset', 'xl']}
        display="flex"
        gap="xs"
        color="onSurface"
        alignItems="center"
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
          Switch Account
        </Typography>
        <Box
          display={['flex', 'flex', 'flex', 'none']}
          flexDirection="row-reverse"
        >
          <Box display="flex" justifyContent="flex-end">
            <Button
              isIcon
              variant="text"
              width="1.5rem"
              height="1.5rem"
              onClick={handleCloseProfile}
            >
              <TimesSVG
                width="100%"
                height="100%"
                maxWidth="100%"
                maxHeight="100%"
              />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box p="xl" display={['flex', 'flex', 'flex', 'none']}>
        <Typography
          size="small"
          variant="title"
          color="onSurface"
          textTransform="capitalize"
        >
          {`Account${size > 1 ? 's' : ''}`}
        </Typography>
      </Box>
    </>
  );
};

export default MenuSwitchAccountHeader;
