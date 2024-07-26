import React from 'react';
import MainNavBar from "@/components/MainNavBar";
import { signout } from "../../signin/actions";
import Footer from '@/components/footer/footer';

const CustomErrorPage = ({ params }: { params: { message: string } }) => {
    return (
        <>
        <MainNavBar signout={signout} />
        <h1 className='text-red-600'>An error has ocurred! {params.message}</h1>
        <Footer/>
        </>
    );
};

export default CustomErrorPage;