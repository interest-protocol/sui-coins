export interface IncineratorCoin {
  type: string;
  amount: bigint;
  quantity: number | null;
}

export interface IncineratorObject {
  id: string;
}

export type SendArguments = IncineratorCoin | IncineratorObject;

export interface IncineratorButtonProps {
  openModal: () => void;
}

export interface AmountListProps {
  symbol: string;
  isGreater: boolean;
}
