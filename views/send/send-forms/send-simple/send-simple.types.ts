import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';

export type ObjectField = ObjectData & {
  value: string;
  editable: boolean;
};

export interface ISendSimpleForm {
  objects: ReadonlyArray<ObjectField>;
}
