import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface ObjectField extends CoinObject {
  value: string;
}

export interface ISendBulkForm {
  quantity: string;
  object: ObjectField;
  links: ReadonlyArray<string>;
}

export interface SendBulkLinksProps {
  links: ReadonlyArray<string>;
}
