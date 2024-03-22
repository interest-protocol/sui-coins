import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { noop } from '@/utils';

import { MenuMobileItemProps } from './menu.types';

const MobileMenuListItem: FC<MenuMobileItemProps> = ({
  name,
  path,
  Icon,
  disabled,
}) => {
  const { asPath, push } = useRouter();

  return (
    <Box>
      <Box
        p="l"
        key={v4()}
        display="flex"
        borderRadius="xs"
        color="onSurface"
        opacity={disabled ? 0.7 : 1}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        height="2.2rem"
        bg={asPath === path ? 'highestContainer' : undefined}
        onClick={disabled || !path ? noop : () => push(path)}
        nHover={{
          bg: !disabled && 'highestContainer',
        }}
        justifyContent="space-between"
        alignItems="center"
        mx="auto"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Icon maxHeight="1rem" maxWidth="1rem" width="1.2rem" />
          <Typography
            ml="s"
            size="small"
            variant="title"
            width="max-content"
            textTransform="capitalize"
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileMenuListItem;
