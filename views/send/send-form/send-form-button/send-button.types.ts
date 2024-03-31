export interface SendCoin {
  type: string;
  amount: bigint;
}

export interface SendObject {
  id: string;
}

export type SendArguments = SendCoin | SendObject;
