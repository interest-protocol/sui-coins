import BigNumber from 'bignumber.js';
import { Control, UseFormSetValue } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface LinearLoaderProps {
  loading: boolean;
}

export interface NDTModalMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalBalance: BigNumber;
}

export interface NFTModalItemProps {
  type: string;
  symbol: string;
  origin?: string;
  balance: string;
  selected: boolean;
  onClick: () => void;
}

export interface SelectNFTModalProps {
  closeModal: () => void;
  onSelect: (coin: CoinObject) => void; // TODO: Change to NFT
}

export interface SearchNFTForm {
  search: string;
}

export interface SelectTokenFilterProps {
  control: Control<SearchNFTForm>;
  setValue: UseFormSetValue<SearchNFTForm>;
}

export interface SelectNFTModalBodyProps {
  loading: boolean;
  handleSelectNFT: (coin: CoinObject) => void; // TODO: Change to NFT
}

export interface ModalNFTBodyProps {
  tokens: ReadonlyArray<CoinObject>; // TODO: Change to NFT
  handleSelectNFT: (coin: CoinObject) => void; // TODO: Change to NFT
}
