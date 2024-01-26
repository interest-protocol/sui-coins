import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';
import { CoinData } from '@/interface';

export interface CoinDataWithBalance extends CoinData {
  balance: string;
}

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
  Icon?: FC<SVGProps & { filled?: boolean }>;
}

export interface SelectTokenModalProps {
  simple?: boolean;
  closeModal: () => void;
  onSelect: (coin: CoinDataWithBalance) => void;
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
  handleSelectToken: (coin: CoinDataWithBalance) => void;
  control: Control<SearchTokenForm>;
}

export interface SelectTokenBaseTokensProps {
  handleSelectToken: (coin: CoinDataWithBalance) => void;
}

export interface SelectTokenBaseTokenItemProps
  extends Omit<CoinData, 'decimals'> {
  handleSelectToken: () => void;
}

export interface ModalTokenBodyProps {
  tokenOrigin: TokenOrigin;
  tokens: ReadonlyArray<TokenProps>;
  handleSelectToken: (coin: CoinDataWithBalance) => void;
}

export interface TokenProps {
  type: string;
  symbol: string;
  origin?: string;
  totalBalance?: BigNumber;
  objects?: ReadonlyArray<any>;
  decimals: number;
}

export interface LinearLoaderProps {
  loading: boolean;
}
