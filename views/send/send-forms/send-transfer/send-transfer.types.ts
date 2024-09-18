import { ObjectData } from '../../../../resui/web3-manager/all-objects-manager/all-objects.types';

export type ObjectField = ObjectData & {
  value: string;
  editable: boolean;
};

export interface ISendTransferForm {
  address: string;
  objects: ReadonlyArray<ObjectField>;
}
