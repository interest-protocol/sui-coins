import { ObjectData } from '@/hooks/use-get-all-objects/use-get-all-objects.types';

export type ObjectField = ObjectData & {
  value: string;
  editable: boolean;
};

export interface SendSimpleForm {
  objects: ReadonlyArray<ObjectField>;
}
