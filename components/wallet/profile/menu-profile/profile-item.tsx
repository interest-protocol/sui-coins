import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ItemWrapper from '../../../menu-mobile/menu-settings/item-wrapper';
import { ProfileMenuItemProps } from '../profile.types';

const MenuProfileItem: FC<ProfileMenuItemProps> = ({
  name,
  Icon,
  disabled,
  hasBorder,
  description,
  handleAction,
}) => (
  <Box
    borderTop={['unset', 'unset', 'unset', hasBorder ? '1px solid' : 'unset']}
    borderColor="outlineVariant"
  >
    <ItemWrapper
      disabled={disabled}
      onClick={() => {
        !disabled && handleAction && handleAction[name]?.();
      }}
    >
      <Box
        gap="l"
        display="flex"
        alignItems="center"
        opacity={disabled ? 0.7 : 1}
      >
        <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
        <Typography size="small" variant="title" color="onSurface">
          {description}
        </Typography>
      </Box>
    </ItemWrapper>
  </Box>
);

export default MenuProfileItem;
