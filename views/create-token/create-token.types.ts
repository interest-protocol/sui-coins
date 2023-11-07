import { Control, UseFormSetValue } from 'react-hook-form';

export interface ICreateTokenForm {
  name: string;
  symbol: string;
  imageUrl?: string;
  description?: string;
  decimals?: number;
  totalSupply: number;
  fixedSupply: boolean;
}

export interface FixedSupplyToggleProps {
  control: Control<ICreateTokenForm>;
  setValue: UseFormSetValue<ICreateTokenForm>;
}
