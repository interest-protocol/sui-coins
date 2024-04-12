import { ObjectData } from '@/context/all-objects/all-objects.types';

export type ObjectField = ObjectData & {
  value: string;
  editable: boolean;
};

export interface IncineratorForm {
  objects: ReadonlyArray<ObjectField>;
}
