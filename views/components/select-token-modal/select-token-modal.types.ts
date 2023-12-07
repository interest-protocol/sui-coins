import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';

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
  symbol: string;
  symbol2: string;
  balance: string;
  selected: boolean;
  favorite?: boolean;
  onClick: () => void;
  isFavorite?: boolean;
  Icon: FC<SVGProps & { filled?: boolean }>;
}

export interface SelectTokenModalProps {
  simple?: boolean;
  closeModal: () => void;
}

export interface SelectTokenFilterProps {
  formSearchToken: UseFormReturn<SearchTokenForm>;
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
  handleSelectToken: () => void;
  formSearchToken: UseFormReturn<SearchTokenForm>;
}

export interface SelectTokenBaseTokensProps {
  handleSelectToken: () => void;
}

export interface ModalTokenBodyProps {
  isFavorite?: boolean;
  tokenOrigin: TokenOrigin;
  handleSelectToken: () => void;
  tokens: ReadonlyArray<TokenProps>;
}

export interface TokenProps {
  type: string;
  symbol: string;
  symbol2?: string;
  totalBalance: BigNumber;
  objects?: ReadonlyArray<any>;
  decimals: number;
}

export interface LinearLoaderProps {
  loading: boolean;
}
