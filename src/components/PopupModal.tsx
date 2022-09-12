import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const PopupModal: React.FC<IModalProps> = ({ onClose, children }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Modal isOpen={!!id} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default PopupModal;
