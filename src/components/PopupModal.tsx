import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IModalProps {
  children: React.ReactNode;
}

const PopupModal: React.FC<IModalProps> = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Modal isOpen={!!id} onClose={() => router.back()}>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default PopupModal;
