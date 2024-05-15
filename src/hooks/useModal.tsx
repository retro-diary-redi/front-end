import Modal from '@/components/Modal';
import { ReactNode, useCallback, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const open = useCallback(
    (message: string) => {
      setMessage(message);
      setIsOpen(true);
    },
    [message]
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    Modal: isOpen
      ? ({ children }: { children: ReactNode }) => (
          <Modal onClose={close} message={message}>
            {children}
          </Modal>
        )
      : () => null,
    open,
    close,
    isOpen,
  };
};

export default useModal;
