import { Network } from '@/constants/network';
import { Chain } from '@/interface';

export interface TokenIconProps {
  chain?: Chain;
  tokenId: string;
  network: Network;
  maxWidth?: string;
  maxHeight?: string;
}
