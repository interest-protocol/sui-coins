export interface DCAOrder {
  dca: string;
  fee: number;
  input: {
    name: number;
  };
  input_amount: number;
  output: {
    name: number;
  };
  output_amount: number;
  timestampMs: number;
}
