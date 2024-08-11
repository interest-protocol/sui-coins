import { LOCAL_STORAGE_VERSION } from '@/constants';

export const LOCAL_STORAGE_TOP_KEY = `${LOCAL_STORAGE_VERSION}-send-tip-state`;

export enum SendType {
  Link = 'link',
  Bulk = 'bulk',
  Transfer = 'transfer',
}
