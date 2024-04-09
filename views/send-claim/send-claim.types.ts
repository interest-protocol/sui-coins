import { ZkSendLink } from '@mysten/zksend';
import { KeyedMutator } from 'swr';

export interface SendClaimProps {
  error: any;
  data?: ZkSendLink;
  isLoading: boolean;
  mutate: KeyedMutator<ZkSendLink>;
}

export interface IClaimForm {
  address: string;
}
