import { Control, UseFormSetValue } from 'react-hook-form';

export interface ICreateTokenForm {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals?: number | undefined;
  imageUrl?: string | undefined;
  description: string;
  fixedSupply: NonNullable<boolean | undefined>;
}

export interface FixedSupplyToggleProps {
  control: Control<ICreateTokenForm>;
  setValue: UseFormSetValue<ICreateTokenForm>;
}
