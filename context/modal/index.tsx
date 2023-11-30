import { Modal } from '@interest-protocol/ui-kit';
import { ModalProps } from '@interest-protocol/ui-kit/dist/components/modal/modal.types';
import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';

export interface ModalContext {
  handleClose: () => void;
  setModal: (node: ReactNode, props?: ModalProps) => void;
}

const modalContext = createContext({} as ModalContext);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = modalContext;
  const [component, setComponent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<Omit<ModalProps, 'isOpen'>>({});

  const handleClose = () => {
    setComponent(null);
    modalProps?.onClose?.();
  };

  const setModal = (node: ReactNode, props = {} as ModalProps) => {
    setComponent(node);
    setModalProps(props);
  };

  const value: ModalContext = {
    setModal,
    handleClose,
  };

  return (
    <Provider value={value}>
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Modal
          {...modalProps}
          isOpen={!!component}
          onClose={handleClose}
          appElement={document.getElementById('__next') as HTMLElement}
        >
          {component}
        </Modal>
      }
      {children}
    </Provider>
  );
};

export default modalContext;
