export interface SendCoin {
  type: string;
  amount: bigint;
  quantity: number | null;
}

export interface SendObject {
  id: string;
}

export type SendArguments = SendCoin | SendObject;

export interface FormSendButtonProps {
  openModal: () => void;
}

export interface AmountListProps {
  symbol: string;
  isGreater: boolean;
}
