import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

import { ObjectData } from './../../../hooks/use-get-all-objects/use-get-all-objects.types';

export type ObjectModalItemProps = {
  selected: boolean;
  onClick: () => void;
} & (CoinObject | ObjectData);

export interface SelectObjectModalProps {
  closeModal: () => void;
  onSelect: (object: CoinObject | ObjectData) => void;
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
  handleSelectObject: (object: CoinObject | ObjectData) => void;
}

export interface SelectObjectModalBodyProps
  extends SelectObjectBaseObjectsProps {
  control: Control<SearchObjectForm>;
}

export interface SelectObjectBaseObjectItemProps
  extends Pick<CoinObject | ObjectData, 'type'> {
  network: Network;
  handleSelectObject: () => void;
}

export interface ModalObjectBodyProps extends SelectObjectBaseObjectsProps {
  objects: ReadonlyArray<CoinObject | ObjectData>;
}

export interface ModalObjectSearchProps extends SelectObjectBaseObjectsProps {
  search: string;
}
