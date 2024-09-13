import { Control, UseFormSetValue } from 'react-hook-form';

import { ObjectData } from '../../../resui/web3-manager/all-objects-manager/all-objects.types';
import { Network } from '@/constants';

export type ObjectModalItemProps = ObjectData & {
  selected: boolean;
  onClick: () => void;
};

export interface SelectObjectModalProps {
  noCoins?: boolean;
  closeModal: () => void;
  onSelect: (object: ObjectData) => void;
}

export interface SelectObjectFilterProps
  extends Pick<SelectObjectModalProps, 'noCoins'> {
  control: Control<SearchObjectForm>;
  setValue: UseFormSetValue<SearchObjectForm>;
}

export enum ObjectOrigin {
  Coins = 'coins',
  NFT = 'nft',
  Objects = 'others',
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
