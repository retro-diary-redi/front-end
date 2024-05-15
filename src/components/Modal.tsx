import { ReactNode } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 100;
`;

const StyledModal = styled.div`
  width: 350px;
  padding: 30px;
  background-color: var(--primary);
  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);

  .msg {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;

interface ModalProps {
  children: ReactNode;
  onClose: (() => void) | null;
  message: string;
}

const Modal = ({ children, onClose, message }: ModalProps) => {
  return (
    <ModalWrapper onClick={onClose!}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <p className="msg">{message}</p>
        {children}
      </StyledModal>
    </ModalWrapper>
  );
};

export default Modal;
