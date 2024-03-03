import React from 'react';
import { Modal as AntdModal } from 'antd';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  flex?: boolean;
  width?: string; 
}

const Modal = ({ isOpen, onClose, onSubmit, title, children, flex, width }: ModalProps) => {
  return (
    <AntdModal
      centered
    //   okButtonProps={{ style: { backgroundColor: colors.primary } }}
      title={title}
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      width={width} 
    >
      {flex ? <div style={{ display: 'flex', justifyContent: 'space-between' }}>{children}</div> : children}
    </AntdModal>
  );
};

export default Modal;