import React from 'react';
import dynamic from 'next/dynamic';
const Accounts = dynamic(() => import('@/components/accounts'));
const accounts = () => {
   return <Accounts />;
};

export default accounts;