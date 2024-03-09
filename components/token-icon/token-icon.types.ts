import { Network } from '@/constants/network';

export interface TokenIconProps {
  tokenId?: string;
  network: Network;
  maxWidth?: string;
  maxHeight?: string;
}
