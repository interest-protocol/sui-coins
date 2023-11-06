export interface ICreateTokenForm {
  name: string;
  symbol: string;
  imageUrl: string;
  decimals: number;
  totalSupply: number;
  fixedSupply: boolean;
}
