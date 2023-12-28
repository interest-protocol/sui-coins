import {
  Box,
  Motion,
  Theme,
  TooltipWrapper,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { MenuItemTitleContentProps } from '../sidebar.types';
import CollapseIcon from './collapsible-icon';

const MenuItemTitleBackground: FC = () => (
  <Motion
    left="50%"
    zIndex="-1"
    height="100%"
    borderRadius="m"
    position="absolute"
    transform="translate(-50%)"
    bg="surface.containerHighest"
    variants={{
      rest: { width: '0' },
      hover: { width: '100%', transition: { duration: 0.3 } },
    }}
  />
);

const MenuItemTitleContent: FC<MenuItemTitleContentProps> = ({
  Icon,
  name,
  path,
  disabled,
  isCollapsed,
  accordionList,
}) => {
  const { asPath, push } = useRouter();
  const { colors } = useTheme() as Theme;

  const onClick = () => {
    if (accordionList || disabled) return;
    push(path);
  };

  return (
    <Motion
      mx="auto"
      key={v4()}
      zIndex="1"
      width="auto"
      height="3rem"
      display="flex"
      color="onSurface"
      overflow="hidden"
      onClick={onClick}
      position="relative"
      alignItems="center"
      opacity={disabled ? 0.7 : 1}
      justifyContent="space-between"
      p={isCollapsed ? '0.65rem' : 's'}
      borderRadius={isCollapsed ? 'm' : 'xs'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={
        asPath === path || accordionList?.some(({ path }) => path === asPath)
          ? `${colors.primary}29`
          : undefined
      }
    >
      <MenuItemTitleBackground />
      <Box display="flex" alignItems="center">
        <Box width="1.2rem" height="1.2rem" m="2xs">
          <Icon maxHeight="1.2rem" maxWidth="1.2rem" width="100%" />
        </Box>
        <Typography ml="l" size="large" variant="label" width="max-content">
          {name}
        </Typography>
      </Box>
      {!isCollapsed && accordionList && <CollapseIcon />}
    </Motion>
  );
};

const MenuItemTitle: FC<MenuItemTitleContentProps> = ({
  Icon,
  name,
  path,
  disabled,
  isCollapsed,
  accordionList,
}) => {
  if (isCollapsed)
    return (
      <TooltipWrapper
        bg="onSurface"
        width="max-content"
        tooltipPosition="right"
        display={isCollapsed ? (disabled ? 'none' : 'block') : 'none'}
        tooltipContent={
          <Typography
            size="small"
            variant="label"
            color="lowestContainer"
            textTransform="capitalize"
          >
            {name}
          </Typography>
        }
      >
        <MenuItemTitleContent
          Icon={Icon}
          name={name}
          path={path}
          disabled={disabled}
          isCollapsed={isCollapsed}
          accordionList={accordionList}
        />
      </TooltipWrapper>
    );

  return (
    <MenuItemTitleContent
      Icon={Icon}
      name={name}
      path={path}
      disabled={disabled}
      isCollapsed={isCollapsed}
      accordionList={accordionList}
    />
  );
};

export default MenuItemTitle;
