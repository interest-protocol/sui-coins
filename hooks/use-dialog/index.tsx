import { Dialog } from '@interest-protocol/ui-kit';

import { useModal } from '../use-modal';
import { IDialogData } from './use-dialog.types';

export const useDialog = () => {
  const { setModal, handleClose } = useModal();

  return {
    handleClose,
    dialog: {
      promise: async (
        promise: Promise<void | unknown>,
        {
          loading,
          success,
          error,
        }: Record<'error' | 'loading' | 'success', IDialogData>
      ): Promise<void> => {
        try {
          setModal(<Dialog status="loading" {...loading} />, {
            isOpen: true,
            custom: true,
            onClose: loading.onClose,
          });
          await promise;
          setModal(<Dialog status="success" {...success} />, {
            isOpen: true,
            custom: true,
            onClose: success.onClose,
          });
        } catch {
          setModal(<Dialog status="error" {...error} />, {
            isOpen: true,
            custom: true,
            onClose: error.onClose,
          });
        }
      },
    },
  };
};
