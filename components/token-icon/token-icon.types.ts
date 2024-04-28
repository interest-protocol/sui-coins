import { Network } from '@/constants';

interface BaseTokenIconProps {
  size?: string;
  symbol: string;
  withBg?: boolean;
  rounded?: boolean;
  loaderSize?: number;
}

export interface TypeBasedIcon extends BaseTokenIconProps {
  type: string;
  network: Network;
}

export interface UrlBasedIcon extends BaseTokenIconProps {
  url: string;
}

export type TokenIconProps = TypeBasedIcon | UrlBasedIcon;
