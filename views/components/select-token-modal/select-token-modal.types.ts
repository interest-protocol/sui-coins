import BigNumber from 'bignumber.js';
import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface LinearLoaderProps {
  loading: boolean;
}

export interface TokenModalMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalBalance: BigNumber;
}

export interface TokenModalItemProps {
  type: string;
  symbol: string;
  origin?: string;
  balance: string;
  selected: boolean;
  isSuggested: boolean;
  onClick: () => void;
}

export interface SelectTokenModalProps {
  simple?: boolean;
  closeModal: () => void;
  onSelect: (coin: CoinObject) => void;
}

export interface SelectTokenFilterProps {
  control: Control<SearchTokenForm>;
  setValue: UseFormSetValue<SearchTokenForm>;
}

export enum TokenOrigin {
  All,
  Favorites,
  Suggested,
}

export interface SearchTokenForm {
  search: string;
  filter: TokenOrigin;
}

export interface SelectTokenModalBodyProps {
  loading: boolean;
  handleSelectToken: (coin: CoinObject) => void;
  control: Control<SearchTokenForm>;
}

export interface SelectTokenBaseTokensProps {
  handleSelectToken: (coin: CoinObject) => void;
}

export interface SelectTokenBaseTokenItemProps
  extends Omit<CoinObject, 'decimals'> {
  network: Network;
  handleSelectToken: () => void;
}

export interface ModalTokenBodyProps {
  tokenOrigin: TokenOrigin;
  tokens: ReadonlyArray<CoinObject>;
  handleSelectToken: (coin: CoinObject) => void;
}

export interface LinearLoaderProps {
  loading: boolean;
}
