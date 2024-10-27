import type { TimeScale } from '@interest-protocol/dca-sdk';

export interface DCA {
  id: string;
  min: string;
  max: string;
  owner: string;
  every: number;
  start: number;
  active: boolean;
  cooldown: number;
  delegatee: string;
  lastTrade: number;
  isTrading: boolean;
  feePercent: number;
  totalOrders: number;
  timeScale: TimeScale;
  inputBalance: number;
  amountPerTrade: number;
  input: { name: string };
  remainingOrders: number;
  output: { name: string };
}

export interface DCAOrder {
  dca: string;
  fee: number;
  digest: string;
  timestampMs: number;
  input_price: number;
  output_price: number;
  input_amount: number;
  output_amount: number;
  input: { name: number };
  output: { name: number };
}

export interface Paginated<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  data: ReadonlyArray<T>;
}
