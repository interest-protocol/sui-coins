import { Network } from '@/constants';
import { Chain } from '@/interface';

export interface TokenIconProps {
  chain?: Chain;
  tokenId: string;
  network: Network;
  maxWidth?: string;
  maxHeight?: string;
}
