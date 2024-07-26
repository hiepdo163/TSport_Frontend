import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'

type Props = {}

const AddUserModal = (props: Props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div>
            <Button onPress={onOpen} color='primary'>Thêm tài khoản</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Thêm tài khoản
                            </ModalHeader>
                            <ModalBody>
                                <Input label='Email' variant='bordered' />
                                <Input label='Mật khẩu' type='password' variant='bordered' />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Thêm 
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddUserModal;