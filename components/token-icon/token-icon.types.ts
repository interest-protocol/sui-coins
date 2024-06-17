import { Network } from '@/constants';

export interface TokenIconProps {
  type: string;
  size?: string;
  symbol: string;
  simple?: boolean;
  withBg?: boolean;
  network: Network;
  rounded?: boolean;
  loaderSize?: number;
  url?: string | null;
}
