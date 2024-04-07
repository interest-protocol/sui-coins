import { KeyedMutator } from 'swr';

import { ZkSendLinkWithUrl } from '../send-link/send-link.types';

export interface SendClaimProps {
  id: string;
  error: any;
  isLoading: boolean;
  data?: ZkSendLinkWithUrl;
  mutate: KeyedMutator<ZkSendLinkWithUrl>;
}

export interface IClaimForm {
  address: string;
}
