import {
  Box,
  Motion,
  Theme,
  TooltipWrapper,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { ArrowObliqueSVG } from '@/svg';

import { MenuItemTitleContentProps } from '../sidebar.types';
import CollapseIcon from './collapsible-icon';

const MenuItemTitleBackground: FC = () => (
  <Motion
    left="50%"
    zIndex="-1"
    height="100%"
    borderRadius="xs"
    position="absolute"
    bg="highestContainer"
    transform="translate(-50%)"
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
  beta,
  disabled,
  isCollapsed,
  accordionList,
  suiWalletLink,
}) => {
  const { asPath, push } = useRouter();
  const { colors } = useTheme() as Theme;
  const { currentWallet } = useCurrentWallet();

  const isSelected =
    path === Routes[RoutesEnum.Swap]
      ? asPath === path
      : asPath.startsWith(path!) ||
        accordionList?.some(({ path }) => path === asPath);

  const isSuiWallet = !!suiWalletLink && currentWallet?.name === 'Sui Wallet';

  const onClick = () => {
    if (accordionList || disabled || !path) return;

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
      overflow="hidden"
      color="onSurface"
      onClick={onClick}
      position="relative"
      alignItems="center"
      opacity={disabled ? 0.7 : 1}
      justifyContent="space-between"
      p={isCollapsed ? '0.65rem' : 's'}
      borderRadius={isCollapsed ? 'm' : 'xs'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={isSelected ? `${colors.primary}29` : undefined}
    >
      {!disabled && !isSelected && <MenuItemTitleBackground />}
      <Box display="flex" alignItems="center">
        <Box width="1.2rem" height="1.2rem" m="2xs">
          <Icon maxHeight="1.2rem" maxWidth="1.2rem" width="100%" />
        </Box>
        <Typography ml="l" size="large" variant="label" width="max-content">
          {name}
        </Typography>
      </Box>
      {isSuiWallet && (
        <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5em" width="100%" />
      )}
      {beta &&
        (isCollapsed ? (
          <Box
            bg="error"
            top="0.75rem"
            width="0.5rem"
            left="1.75rem"
            height="0.5rem"
            position="absolute"
            borderRadius="50%"
          />
        ) : (
          <Typography
            px="xs"
            py="2xs"
            size="small"
            variant="label"
            border="1px solid"
            borderRadius="2xs"
            bg="errorContainer"
            color="onErrorContainer"
          >
            Beta
          </Typography>
        ))}
      {!isCollapsed && accordionList && <CollapseIcon />}
    </Motion>
  );
};

const MenuItemTitle: FC<MenuItemTitleContentProps> = ({
  name,
  disabled,
  isCollapsed,
  ...props
}) => {
  if (isCollapsed)
    return (
      <TooltipWrapper
        bg="onSurface"
        zIndex={2}
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
          name={name}
          disabled={disabled}
          isCollapsed={isCollapsed}
          {...props}
        />
      </TooltipWrapper>
    );

  return (
    <MenuItemTitleContent
      name={name}
      disabled={disabled}
      isCollapsed={isCollapsed}
      {...props}
    />
  );
};

export default MenuItemTitle;
