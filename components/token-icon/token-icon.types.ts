import { Network } from '@/constants';

export interface TokenIconProps {
  type: string;
  size?: string;
  symbol: string;
  withBg?: boolean;
  network: Network;
  rounded?: boolean;
}
