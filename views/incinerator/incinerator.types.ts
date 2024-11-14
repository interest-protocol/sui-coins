import type { MouseEventHandler } from 'react';

import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';

export enum IncineratorTabEnum {
  All,
  Coin,
  NFT,
  Other,
}

export type ObjectField = ObjectData & {
  value: string;
  active: boolean;
  editable: boolean;
  isEditing: boolean;
  kind: 'Coin' | 'NFT' | 'Other';
};

export interface IncineratorForm {
  reset: boolean;
  search: string;
  empty: boolean;
  checked: boolean;
  tab: IncineratorTabEnum;
  objects: ReadonlyArray<ObjectField>;
}

export interface IncineratorTableColumnAndRowProps {
  index: number;
}

export interface IncineratorTableRowProps
  extends IncineratorTableColumnAndRowProps {
  object: ObjectField;
}

export interface IncineratorTokenObjectProps {
  object: ObjectField;
}

export interface IncineratorTableColumnProps
  extends IncineratorTableColumnAndRowProps {
  value: string;
}

export interface IncineratorTableActionsProps {
  handleCancel: MouseEventHandler<HTMLDivElement>;
  handleApprove: MouseEventHandler<HTMLDivElement>;
}
