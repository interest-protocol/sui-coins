import BigNumber from 'bignumber.js';
import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinDataWithChainInfo } from '@/views/pool-details/pool-form/pool-form.types';

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
  loading: boolean;
  handleSelectToken: (coin: CoinObject) => void;
  control: Control<SearchTokenForm>;
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
  handleSelectToken: (type: string) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (type: string) => void;
}
