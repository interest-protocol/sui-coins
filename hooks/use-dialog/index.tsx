import { Dialog } from '@interest-protocol/ui-kit';

import { useModal } from '@/hooks/use-modal';

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
          setModal(<Dialog isOpen status="loading" {...loading} />, {
            isOpen: true,
            custom: true,
            onClose: loading.onClose,
          });
          await promise;
          setModal(<Dialog isOpen status="success" {...success} />, {
            isOpen: true,
            custom: true,
            onClose: loading.onClose,
          });
        } catch {
          setModal(<Dialog isOpen status="error" {...error} />, {
            isOpen: true,
            custom: true,
            onClose: loading.onClose,
          });
        }
      },
    },
  };
};
