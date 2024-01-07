import { DialogProps } from '@interest-protocol/ui-kit/dist/components/dialog/dialog.types';

export type IDialogData = Omit<DialogProps, 'isOpen' | 'status'>;
