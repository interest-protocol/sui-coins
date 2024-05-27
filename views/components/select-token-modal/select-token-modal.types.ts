import { Control, UseFormSetValue } from 'react-hook-form';

import { CoinData } from '@/interface';

export interface TokenModalItemProps
  extends Omit<CoinData, 'decimals' | 'balance'> {
  selected: boolean;
  onClick: () => void;
}

export interface SelectTokenModalProps {
  faucet?: boolean;
  simple?: boolean;
  closeModal: () => void;
  onSelect: (coin: CoinData) => void;
}

export interface SelectTokenFilterProps {
  control: Control<SearchTokenForm>;
  setValue: UseFormSetValue<SearchTokenForm>;
}

export enum TokenOrigin {
  Strict,
  Wallet,
}

export interface SearchTokenForm {
  search: string;
  filter: TokenOrigin;
}

export interface SelectTokenModalBodyProps
  extends Pick<SelectTokenModalProps, 'faucet'> {
  control: Control<SearchTokenForm>;
  handleSelectToken: (coin: CoinData) => void;
}

export interface ModalTokenBodyProps {
  tokens: ReadonlyArray<CoinData>;
  handleSelectToken: (coin: CoinData) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (type: string) => void;
}
