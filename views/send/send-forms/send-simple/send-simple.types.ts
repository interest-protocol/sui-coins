import { ObjectData } from '@/hooks/use-all-objects/all-objects.types';

export type ObjectField = ObjectData & {
  value: string;
  editable: boolean;
};

export interface ISendSimpleForm {
  objects: ReadonlyArray<ObjectField>;
}
