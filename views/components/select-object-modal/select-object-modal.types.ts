import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants';
import { ObjectData } from '@/context/all-objects/all-objects.types';

export type ObjectModalItemProps = ObjectData & {
  selected: boolean;
  onClick: () => void;
};

export interface SelectObjectModalProps {
  closeModal: () => void;
  onSelect: (object: ObjectData) => void;
}

export interface SelectObjectFilterProps {
  control: Control<SearchObjectForm>;
  setValue: UseFormSetValue<SearchObjectForm>;
}

export enum ObjectOrigin {
  Coins,
  NFT,
  Objects,
}

export interface SearchObjectForm {
  search: string;
  filter: ObjectOrigin;
}

export interface SelectObjectBaseObjectsProps {
  handleSelectObject: (object: ObjectData) => void;
}

export interface SelectObjectModalBodyProps
  extends SelectObjectBaseObjectsProps {
  control: Control<SearchObjectForm>;
}

export interface SelectObjectBaseObjectItemProps
  extends Pick<ObjectData, 'type'> {
  network: Network;
  handleSelectObject: () => void;
}

export interface ModalObjectBodyProps extends SelectObjectBaseObjectsProps {
  objects: ReadonlyArray<ObjectData>;
}

export interface ModalObjectSearchProps extends SelectObjectBaseObjectsProps {
  search: string;
}
