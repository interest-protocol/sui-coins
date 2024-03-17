import { Dialog } from '@interest-protocol/ui-kit';

import { useModal } from '@/hooks/use-modal';

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
          setModal(<Dialog status="loading" {...loading} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
          await promise;
          setModal(<Dialog status="success" {...success} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
        } catch {
          setModal(<Dialog status="error" {...error} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
        }
      },
    },
  };
};
