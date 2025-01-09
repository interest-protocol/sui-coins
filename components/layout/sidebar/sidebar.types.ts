import { Dispatch, FC, SetStateAction } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { Network } from '@/constants';

export interface AccordionItemProps {
  name: string;
  path: string;
  beta?: boolean;
  disabled: boolean;
  Icon: FC<SVGProps>;
  suiWalletLink?: string;
  isExternalLink?: boolean;
  networks: ReadonlyArray<Network>;
}

export interface IMenuItem extends Omit<AccordionItemProps, 'path'> {
  path?: string;
  accordionList?: ReadonlyArray<AccordionItemProps>;
}

export interface SidebarLogoProps {
  isCollapsed: boolean;
}

export interface MenuMobileItemProps
  extends Omit<MenuItemProps, 'setTemporarilyOpen'> {
  index: number;
}

export interface MenuListProps extends SidebarLogoProps {
  open: string | null;
  setIsCollapsed: (value: boolean) => void;
  setTemporarilyOpen: Dispatch<SetStateAction<string | null>>;
}

export type MenuItemProps = MenuItemTitleContentProps &
  MenuListProps &
  Pick<IMenuItem, 'networks'>;

export interface SidebarCollapseButtonProps
  extends SidebarLogoProps,
    Pick<MenuItemProps, 'setIsCollapsed'> {
  isOpen: boolean;
}

export type MenuListItemTextProps = Omit<IMenuItem, 'beta' | 'networks'> &
  SidebarLogoProps;

export type MenuItemCollapsibleProps = Pick<
  IMenuItem,
  'beta' | 'accordionList'
>;

export type MenuItemTitleContentProps = SidebarLogoProps &
  MenuItemCollapsibleProps &
  Omit<IMenuItem, 'beta' | 'accordionList' | 'networks'>;
