import { ObjectData } from '@/hooks/use-get-all-objects/use-get-all-objects.types';

export type ObjectField = ObjectData & {
  value: string;
  editable: boolean;
};

export interface ZkSendForm {
  object: ObjectField;
}

export interface SendFormProps {
  isBulk: boolean;
}
