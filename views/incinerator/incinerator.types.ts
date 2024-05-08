import type { MouseEvent as ReactMouseEvent } from 'react';

import type { ObjectData } from '@/context/all-objects/all-objects.types';

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
  kind: 'Coin' | 'NFT' | 'Other';
};

export interface IncineratorForm {
  reset: boolean;
  search: string;
  checked: boolean;
  tab: IncineratorTabEnum;
  objects: ReadonlyArray<ObjectField>;
}

export interface IncineratorTableRowProps {
  index: number;
}

export interface IncineratorTokenObjectProps {
  object: ObjectField;
}

export interface IncineratorTableColumnProps extends IncineratorTableRowProps {
  value: string;
}

export interface IncineratorTableActionsProps {
  handleCancel: (e?: ReactMouseEvent<MouseEvent>) => void;
  handleApprove: (e?: ReactMouseEvent<MouseEvent>) => void;
}
