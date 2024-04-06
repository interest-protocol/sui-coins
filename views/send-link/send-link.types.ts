import { ZkSendLink } from '@mysten/zksend';

export interface SendLinkProps {
  id: string;
}

export type ZkSendLinkWithUrl =
  | {
      url: string;
      link: ZkSendLink;
    }
  | { url: undefined; link: null };
