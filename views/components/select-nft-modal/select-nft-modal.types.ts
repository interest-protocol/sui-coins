import BigNumber from 'bignumber.js';
import { Control, UseFormSetValue } from 'react-hook-form';

import { NFTCollection } from '@/interface';

export interface LinearLoaderProps {
  loading: boolean;
}

export interface NDTModalMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalBalance: BigNumber;
}

export interface NFTModalItemProps extends NFTCollection {
  selected: boolean;
  onClick: () => void;
}

export interface SelectNFTModalProps {
  closeModal: () => void;
  onSelect: (nft: NFTCollection) => void;
}

export interface SearchNFTForm {
  search: string;
}

export interface SelectTokenFilterProps {
  control: Control<SearchNFTForm>;
  setValue: UseFormSetValue<SearchNFTForm>;
}

export interface SelectNFTModalBodyProps {
  handleSelectNFT: (nft: NFTCollection) => void;
}

export interface ModalNFTBodyProps {
  nftList: ReadonlyArray<NFTCollection>;
  handleSelectNFT: (nft: NFTCollection) => void;
}
