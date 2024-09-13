import { CoinObject } from '../../../../resui/web3-manager/coins-manager/coins-manager.types';

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
