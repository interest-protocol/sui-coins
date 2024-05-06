import { ObjectData } from '@/context/all-objects/all-objects.types';

export enum IncineratorTabEnum {
  All,
  Coin,
  NFT,
  Other,
}

export type ObjectField = ObjectData & {
  index: number;
  value: string;
  active: boolean;
  editable: boolean;
  isEditing: boolean;
};

export interface IncineratorForm {
  checked: boolean;
  searchAssets: string;
  tab: IncineratorTabEnum;
  objects: ReadonlyArray<ObjectField>;
}

export interface IncineratorTableRowProps {
  object: ObjectField;
}

export interface IncineratorTableBodyRowFieldProps {
  index: number;
}

export interface IncineratorTableColumnProps {
  index: number;
  value: string;
}
