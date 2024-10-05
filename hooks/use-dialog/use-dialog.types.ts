import { DialogProps } from '@/components';

export type IDialogData = Omit<DialogProps, 'isOpen' | 'status'>;
