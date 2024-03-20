import { Dialog } from '@interest-protocol/ui-kit';

import { useModal } from '../use-modal';
import { IDialogData } from './use-dialog.types';

export const useDialog = () => {
  const { setModal, handleClose } = useModal();

  return {
    handleClose,
    dialog: {
      promise: async (
        promise: Promise<void>,
        {
          loading,
          success,
          error,
        }: Record<'error' | 'loading' | 'success', IDialogData>
      ): Promise<void> => {
        try {
          setModal(<Dialog isOpen status="loading" {...loading} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
          await promise;
          setModal(<Dialog isOpen status="success" {...success} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
        } catch {
          setModal(<Dialog isOpen status="error" {...error} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
        }
      },
    },
  };
};
