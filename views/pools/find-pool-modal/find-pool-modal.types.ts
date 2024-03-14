import { CoinData } from '@/interface';

export interface FindPoolModalProps {
  handleSearch?: () => void;
  closeModal: () => void;
}

export interface FindPoolForm {
  tokens: ReadonlyArray<CoinData>;
}

export interface SelectTokenProps {
  index: number;
}
