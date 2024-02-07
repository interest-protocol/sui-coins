import { Network } from '@/constants';
import { Chain } from '@/views/pool-details/pool-form/pool-form.types';

export interface TokenIconProps {
  chain?: Chain;
  tokenId: string;
  network: Network;
  maxWidth?: string;
  maxHeight?: string;
}
