'use client';
import { Button, Spinner } from '@nextui-org/react';
import React from 'react'
import { useFormStatus } from 'react-dom';
import { signin } from './actions';

type Props = {}

const SignInButton = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button
            color="primary"
            className="submit_button"
            type="submit"
            formAction={signin}
            form='signin_form'
        >
            {pending ? <Spinner color='default' /> : <div></div>} Đăng nhập
        </Button>
    )
}

export default SignInButton;