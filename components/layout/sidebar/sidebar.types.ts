import { Dispatch, FC, SetStateAction } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { Network } from '@/constants';

export interface MenuItemCollapsibleProps {
  beta?: boolean;
  accordionList?: ReadonlyArray<AccordionItemProps>;
}

export interface MenuItemTitleContentProps extends MenuItemCollapsibleProps {
  name: string;
  path?: string;
  isOpen?: boolean;
  disabled: boolean;
  Icon: FC<SVGProps>;
  isCollapsed: boolean;
}

export interface MenuItemProps extends MenuItemTitleContentProps {
  networks: ReadonlyArray<Network>;
  setIsCollapsed: (value: boolean) => void;
  setTemporarilyOpen: Dispatch<SetStateAction<boolean>>;
}
export interface MenuMobileItemProps
  extends Omit<MenuItemProps, 'setTemporarilyOpen'> {
  index: number;
}

export interface MenuListItemTextProps {
  name: string;
  path: string;
  disabled: boolean;
  Icon: FC<SVGProps>;
  isCollapsed: boolean;
  accordionList?: ReadonlyArray<AccordionItemProps>;
}

export interface AccordionItemProps {
  name: string;
  path: string;
  beta?: boolean;
  disabled: boolean;
  Icon: FC<SVGProps>;
  networks: ReadonlyArray<Network>;
}

export interface MenuListProps
  extends Pick<MenuItemProps, 'setIsCollapsed' | 'setTemporarilyOpen'> {
  isOpen: boolean;
  isCollapsed: boolean;
}

export interface SidebarLogoProps {
  isCollapsed: boolean;
}

export interface SidebarCollapseButtonProps {
  isOpen: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}
