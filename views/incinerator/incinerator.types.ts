import { ObjectData } from '@/context/all-objects/all-objects.types';

export type ObjectField = ObjectData & {
  index: number;
  value: string;
  state: boolean;
  editable: boolean;
  isEditing: boolean;
};

export interface IncineratorForm {
  objects: ReadonlyArray<ObjectField>;
  searchAssets: string;
  filter: number;
}

export interface IncineratorTableRowProps {
  object: ObjectField;
  asset: 'Coin' | 'NFT' | 'Other';
}

export interface IncineratorTableBodyRowFieldProps {
  index: number;
}

export interface IncineratorTableColumnProps {
  index: number;
  value: string;
}

export enum FilterTableEnum {
  All,
  Coin,
  NFT,
  Other,
}
