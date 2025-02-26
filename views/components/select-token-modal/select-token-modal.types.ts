import { Chain, Token } from '@interest-protocol/sui-tokens';
import BigNumber from 'bignumber.js';
import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants';

import { CoinObject } from '../../../components/web3-manager/coins-manager/coins-manager.types';

export interface TokenModalMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalBalance: BigNumber;
}

export interface TokenModalItemProps extends Omit<Token, 'decimals'> {
  selected: boolean;
  onClick: () => void;
}

export interface SelectTokenModalProps {
  faucet?: boolean;
  simple?: boolean;
  strictOnly?: boolean;
  closeModal: () => void;
  onSelect: (coin: CoinObject) => void;
}

export interface SelectTokenFilterProps {
  control: Control<SearchTokenForm>;
  setValue: UseFormSetValue<SearchTokenForm>;
}

export enum TokenOrigin {
  Strict,
  Wallet,
  Wormhole,
  SuiBridge,
  Fav,
}

export interface SearchTokenForm {
  search: string;
  filter: TokenOrigin;
}

export interface SelectTokenModalBodyProps
  extends Pick<SelectTokenModalProps, 'faucet'> {
  control: Control<SearchTokenForm>;
  handleSelectToken: (coin: CoinObject) => void;
}

export interface FavoritesModalBodyProps {
  search: string;
  types: ReadonlyArray<string>;
  handleSelectToken: (type: string, chain?: Chain) => void;
}

export interface SelectTokenBaseTokensProps {
  handleSelectToken: (coin: CoinObject) => void;
}

export interface SelectTokenBaseTokenItemProps
  extends Pick<CoinObject, 'type' | 'symbol'> {
  network: Network;
  handleSelectToken: () => void;
}

export interface ModalTokenBodyProps {
  tokens: ReadonlyArray<Token>;
  handleSelectToken: (type: string, chain?: Chain) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (type: string) => void;
}
