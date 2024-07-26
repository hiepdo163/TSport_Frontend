'use client';
import { Button } from '@nextui-org/react';
import React from 'react'
import { createShirt } from './actions';
import { useFormStatus } from 'react-dom';
import Swal from 'sweetalert2';

type Props = {
    isEdit: boolean;
    onClose: () => void;
}

const SaveButton = ({ isEdit, onClose }: Props) => {
    const { pending } = useFormStatus();

    return (
        <Button color="primary" type='submit'
            formAction={createShirt}
            form='create_shirt_form'
            isLoading={pending}
            onPress={() => {
                Swal.fire({
                    title: 'Thành công',    
                    icon: 'success',
                    text: 'Thêm áo mới thành công!',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'red'
                });
                onClose();
            }}>
            {isEdit ? "Lưu" : "Thêm"}
        </Button>
    );
};

export default SaveButton;