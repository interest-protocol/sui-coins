import { Network } from '@/constants';

export interface TokenIconProps {
  bg?: string;
  type: string;
  size?: string;
  symbol: string;
  simple?: boolean;
  withBg?: boolean;
  network: Network;
  rounded?: boolean;
  url?: string | null;
  loaderSize?: number;
}
