import { Control, UseFormSetValue } from 'react-hook-form';

import { NFTCollectionMetadata } from '@/interface';

export interface NFTModalItemProps extends NFTCollectionMetadata {
  selected: boolean;
  onClick: () => void;
}

export interface SelectNFTModalProps {
  closeModal: () => void;
  onSelect: (collectionId: string) => void;
}

export interface SearchNFTForm {
  search: string;
}

export interface SelectTokenFilterProps {
  control: Control<SearchNFTForm>;
  setValue: UseFormSetValue<SearchNFTForm>;
}

export interface SelectNFTModalBodyProps {
  handleSelectNFT: (collectionId: string) => void;
}

export interface ModalNFTBodyProps {
  nftList: ReadonlyArray<NFTCollectionMetadata>;
  handleSelectNFT: (collectionId: string) => void;
}
