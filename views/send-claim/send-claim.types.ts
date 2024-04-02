import { ZkSendLink } from '@mysten/zksend';

export interface SendClaimProps {
  id: string;
}

export interface ZkSendLinkWithUrl {
  url: string;
  link: ZkSendLink;
}
