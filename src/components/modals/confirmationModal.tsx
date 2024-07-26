'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react'

type Props = {
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    onConfirm: () => void;
};

const ConfirmationModal = ({ title, content, isOpen, onOpen, onOpenChange, onConfirm }: Props) => {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                {content}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Hủy
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={onConfirm}>
                                    Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ConfirmationModal;