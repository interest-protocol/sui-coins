import { Control, UseFormSetValue } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { TOKEN_SYMBOL } from '@/lib';

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
  onSelect: (coin: CoinDataWithChainInfo) => void;
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
  handleSelectToken: (coin: CoinDataWithChainInfo) => void;
}

export interface ModalTokenBodyProps {
  tokens: ReadonlyArray<CoinDataWithChainInfo | CoinObject>;
  handleSelectToken: (coin: CoinDataWithChainInfo) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (type: string) => void;
}
