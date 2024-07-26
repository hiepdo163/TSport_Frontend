'use client';
import { Button, Spinner } from '@nextui-org/react';
import React from 'react'
import { signup } from '../signin/actions';
import { useFormStatus } from 'react-dom';

type Props = {

};

const SignUpButton = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button
            className="button-resize text-wrapper-7 mb-3"
            type="submit"
            formAction={signup}
            form='signup_form'
        >
            {pending ? <Spinner color='default' /> : <div></div>} Đăng ký
        </Button>
    );
};

export default SignUpButton;