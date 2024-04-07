import { ZkSendLink } from '@mysten/zksend';

export interface SendLinkProps {
  id: string;
  error: any;
  isLoading: boolean;
  data?: ZkSendLinkWithUrl | null;
}

export type ZkSendLinkWithUrl =
  | {
      url: string;
      link: ZkSendLink;
    }
  | { url: undefined; link: null };
