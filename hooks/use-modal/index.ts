import { useContext } from 'react';

import modalContext, { ModalContext } from '@/context/modal';

export const useModal = (): ModalContext => useContext(modalContext);
