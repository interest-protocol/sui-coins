import { ZkSendLink } from '@mysten/zksend';
import { KeyedMutator } from 'swr';

export interface SendLinkProps {
  error: any;
  data?: ZkSendLink;
  isLoading: boolean;
  mutate: KeyedMutator<ZkSendLink>;
}
