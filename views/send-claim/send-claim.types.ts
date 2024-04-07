import { Dispatch, SetStateAction } from 'react';

import { ZkSendLinkWithUrl } from '../send-link/send-link.types';

export interface SendClaimProps {
  id: string;
  error: any;
  isLoading: boolean;
  data?: ZkSendLinkWithUrl;
  claimingState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export interface IClaimForm {
  address: string;
}
