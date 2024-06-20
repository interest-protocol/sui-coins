import {
  AllObjects,
  ObjectData,
} from '@/components/web3-manager/all-objects-manager/all-objects.types';

export interface UseObjectsResponse {
  id: string;
  error: boolean;
  loading: boolean;
  refresh: () => void;
  delay: number | undefined;
  ownedNfts: ReadonlyArray<ObjectData>;
  updateError: (data: boolean) => void;
  updateLoading: (data: boolean) => void;
  coinsObjects: ReadonlyArray<ObjectData>;
  otherObjects: ReadonlyArray<ObjectData>;
  updateAllObjects: (data: AllObjects) => void;
  updateDelay: (delay: number | undefined) => void;
}
