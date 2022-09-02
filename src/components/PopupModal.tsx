import React, { Children } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react";

interface IModalProps {
  isOpen:boolean
  onClose: () => void
  children: React.ReactNode;
}

const PopupModal:React.FC<IModalProps> = ({isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent width={"32rem"}>
      {children}
      </ModalContent>
    </Modal>
  );
};

export default PopupModal;
