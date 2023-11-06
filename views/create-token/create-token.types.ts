export interface ICreateTokenForm {
  name: string;
  symbol: string;
  imageUrl?: string;
  description?: string;
  decimals?: number;
  totalSupply: number;
  fixedSupply: boolean;
}
