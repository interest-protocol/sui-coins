import { Dispatch, SetStateAction } from 'react';

import { ZkSendLinkWithUrl } from '../send-link/send-link.types';

export interface SendClaimProps {
  id: string;
  error: any;
  isLoading: boolean;
  data: ZkSendLinkWithUrl | undefined;
  claimingState: [boolean, Dispatch<SetStateAction<boolean>>];
}
