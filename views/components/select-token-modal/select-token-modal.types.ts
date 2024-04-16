import { Control, UseFormSetValue } from 'react-hook-form';

import { TOKEN_SYMBOL } from '@/constants/coins';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinData } from '@/interface';

export interface CoinDataWithChainInfo {
  type: string;
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
  balance: number | string;
}

export interface TokenModalItemProps
  extends Omit<CoinDataWithChainInfo, 'decimals' | 'balance'> {
  selected: boolean;
  onClick: () => void;
}

export interface SelectTokenModalProps {
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

export interface SelectTokenModalBodyProps {
  control: Control<SearchTokenForm>;
  handleSelectToken: (coin: CoinData) => void;
}

export interface ModalTokenBodyProps {
  tokens: ReadonlyArray<CoinObject | CoinObject>;
  handleSelectToken: (coin: CoinData) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (type: string) => void;
}
