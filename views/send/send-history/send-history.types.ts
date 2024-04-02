import type { ZkSendLink } from '@mysten/zksend';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';

export interface SendHistoryTabsProps {
  tabIndex: number;
  onChangeTab: (index: number) => void;
}

export interface ZkSendLinkItem {
  link: ZkSendLink;
  claimed: boolean;
  assets: LinkAssets;
  digest: string | null;
  createdAt: string | null | undefined;
}
