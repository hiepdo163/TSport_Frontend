'use client';

import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Selection } from "@react-types/shared/src/selection";
import { Button, Select, SelectItem } from '@nextui-org/react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClientSelect from '@/components/ClientSelect';
import { formatPrice } from '@/utils/priceUtils';
import Swal from 'sweetalert2';
import { fetchConfirmOrder } from '@/app/service/order_service';
type Props = {
    cartInfo: OrderInCart;
    accessToken: string;
}
import { redirect } from 'next/navigation';
import { createPaymentUrl } from '@/app/service/vnpay_service';
// const rows = [
//     {
//         key: "1",
//         name: "Tony Reichert",
//         role: "CEO",
//         status: "Active",
//     },
//     {
//         key: "2",
//         name: "Zoey Lang",
//         role: "Technical Lead",
//         status: "Paused",
//     },
//     {
//         key: "3",
//         name: "Jane Fisher",
//         role: "Senior Developer",
//         status: "Active",
//     },
//     {
//         key: "4",
//         name: "William Howard",
//         role: "Community Manager",
//         status: "Vacation",
//     },
// ];

// const columns = [
//     {
//         key: "name",
//         label: "NAME",
//     },
//     {
//         key: "role",
//         label: "ROLE",
//     },
//     {
//         key: "status",
//         label: "STATUS",
//     },
// ];

const shirtColumns = [
    // {
    //     key: 'shirt_id',
    //     label: 'Mã áo'
    // },
    {
        key: 'shirt_name',
        label: 'Tên áo'
    },
    {
        key: 'size',
        label: 'Size'
    },
    {
        key: 'quantity',
        label: 'Số lượng'
    },
    {
        key: 'price',
        label: 'Đơn Giá'
    },
    {
        key: 'total',
        label: 'Tổng'
    }
];

const paymentOptions = [
    {
        key: 'COD',
        label: 'Thanh toán khi nhận hàng'
    },
    {
        key: 'MOMO',
        label: 'Thanh toán qua MOMO'
    }
];

const CartTable = ({ cartInfo, accessToken }: Props) => {

    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([]));

    const shirtRows = cartInfo['order-details'].map(od => ({
        key: od['shirt-id'].toString(),
        shirt_name: od.shirt.name,
        size: od.size,
        quantity: od.quantity,
        price: `${formatPrice(od.shirt['shirt-edition']['discount-price'])} VNĐ`,
        total: `${formatPrice(od.shirt['shirt-edition']['discount-price'] * od.quantity)} VNĐ`
    }));

    // const handleSelectionChange = (keys: Selection) => {
    //     if (keys === 'all') {
    //         // Select all keys
    //         const allKeys = new Set(rows.map(row => row.key));
    //         setSelectedKeys(allKeys);
    //     } else if (keys instanceof Set) {
    //         // Convert keys to Set<string> if it's not already
    //         const newKeys = new Set(Array.from(keys).map(String));
    //         setSelectedKeys(newKeys);
    //     }
    // };

    const handleShirtsSelectionChange = (keys: Selection) => {
        if (keys === 'all') {
            // Select all keys
            const allKeys = new Set(cartInfo['order-details'].map(od => od['shirt-id'].toString()));
            setSelectedKeys(allKeys);
        } else {
            // Convert keys to Set<string> if it's not already
            const newKeys = new Set(Array.from(keys).map(String));
            setSelectedKeys(newKeys);
        }
    };

    const handleConfirmOrderSubmission = async () => {
        const result = await Swal.fire({
            title: 'Xác nhận thanh toán',
            confirmButtonText: 'Thanh toán',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonColor: 'red',
            icon: 'question'
        });
        if (!result.isConfirmed) {
            return;
        }

        const response = await fetchConfirmOrder(accessToken, cartInfo.id, cartInfo['order-details'].map(od => ({
            shirtId: od['shirt-id'],
            quantity: od.quantity,
            size: od.size // Assuming 'size' is a property. Adjust according to the actual structure.
        })));

        if (response?.ok) {
            await Swal.fire({
                icon: "success",
                title: 'Đặt hàng thành công',
                text: 'Cảm ơn bạn đã mua hàng tại cửa hàng TSport!',
                confirmButtonText: 'OK',
                confirmButtonColor: 'red'
            });
            const response = await createPaymentUrl(cartInfo.total, cartInfo['created-account-id'])
            window.location = response.result;
        }
    };

    // // Use useEffect to watch for changes in selectedKeys and update the total accordingly
    // useEffect(() => {
    //     let newTotal = 0;
    //     selectedKeys.forEach(key => {
    //         const orderDetail = cartInfo['order-details'].find(od => od['shirt-id'].toString() === key);
    //         if (orderDetail) {
    //             newTotal += orderDetail.shirt['shirt-edition']['discount-price'] * orderDetail.quantity;
    //         }
    //     });
    //     setTotal(newTotal);
    // }, [selectedKeys]);

    return (
        <>
            <h1 className='text-center text-3xl font-bold mb-10'>Giỏ hàng của bạn <span className='text-red-600'>({cartInfo['order-details'].length} sản phẩm)</span></h1>
            <Table
                aria-label="Rows actions table example with dynamic content"
                selectionMode="multiple"
                selectionBehavior="toggle"
                selectedKeys={selectedKeys}
                className='max-w-[80%] my-0 mx-auto'
                onSelectionChange={handleShirtsSelectionChange}
            >
                <TableHeader columns={shirtColumns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={shirtRows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="payment_row max-w-[80%] my-0 mx-auto mt-5 flex justify-between">
                <div className="flex gap-5 flex-col w-[30%] shadow-lg p-5 rounded-md">
                    {/* <div className="">
                        </div> */}
                    <ClientSelect className='block' items={paymentOptions} label='Phương thức thanh toán' />
                    {/* <div className="">Phí giao hàng: <span className='font-bold text-red-600 ml-2'> 10.000 VNĐ</span></div> */}
                    <div className="">Tổng cộng:<span className='font-bold text-red-600 ml-2'>{formatPrice(cartInfo.total)} VNĐ</span></div>
                </div>
                <Button type='button' className='bg-red-600 text-white'
                    onClick={handleConfirmOrderSubmission}
                    startContent={<CreditCardIcon />}>
                    Đặt hàng và thanh toán</Button>
            </div>
        </>
    );
};

export default CartTable;