import BigNumber from 'bignumber.js';
import { Control, UseFormSetValue } from 'react-hook-form';

import { CHAIN, Network } from '@/constants';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinDataWithChainInfo } from '@/interface';

export interface TokenModalMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalBalance: BigNumber;
}

export interface TokenModalItemProps
  extends Omit<CoinDataWithChainInfo, 'decimals'> {
  selected: boolean;
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
  Strict,
  Wallet,
  Wormhole,
  Celer,
}

export interface SearchTokenForm {
  search: string;
  filter: TokenOrigin;
}

export interface SelectTokenModalBodyProps {
  control: Control<SearchTokenForm>;
  handleSelectToken: (coin: CoinObject) => void;
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
  tokens: ReadonlyArray<CoinDataWithChainInfo>;
  handleSelectToken: (type: string, chain?: CHAIN) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (type: string) => void;
}
