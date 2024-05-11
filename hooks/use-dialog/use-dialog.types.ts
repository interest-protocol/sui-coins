import { DialogProps } from '@interest-protocol/ui-kit';

export type IDialogData = Omit<DialogProps, 'isOpen' | 'status'>;
