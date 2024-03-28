import { ObjectData } from '@/hooks/use-get-all-objects/use-get-all-objects.types';

export interface ObjectField extends ObjectData {
  value: string;
  editable: boolean;
}

export interface ZkSendForm {
  object: ObjectField;
}
