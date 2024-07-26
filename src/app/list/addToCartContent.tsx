'use client';
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchAddToCart } from '../service/order_service';
import Swal from 'sweetalert2';

type Props = {
    shirtId: number;
}

const AddToCartContent = ({ shirtId }: Props) => {

    // const shirtId = parseInt(id as string);
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
    
        const result = await Swal.fire({
            title: "Thêm sản phẩm này vào giỏ hàng?",
            showCancelButton: true,
            confirmButtonText: "Thêm vào giỏ hàng",
            icon: 'question',
            cancelButtonText: "Hủy"
        });

        

        if (!result.isConfirmed) {
            return;
        }

        console.log({ shirtId, quantity, size });
        
        const response = await fetchAddToCart({ shirtId, quantity, size });
        if (response?.status === 200) {
            // Handle success
            console.log('Added to cart successfully');

            await Swal.fire({
                title: 'Thêm vào giỏ hàng thành công!',
                icon: 'success'
            });
        }
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                <span style={{ marginRight: "30px" }}>Kích thước:</span>
                <RadioGroup color="danger" value={size} onChange={(e) => setSize(e.target.value)}>
                    <div className="flex flex-row gap-4">
                        <Radio value="X">X</Radio>
                        <Radio value="XL">XL</Radio>
                        <Radio value="SM">SM</Radio>
                    </div>
                </RadioGroup>
            </div>
            <div className="flex items-center gap-2">
                <Input type="number" label='Số lượng' value={quantity.toString()}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-1/3" />
                <Button type="button"
                    className="text-white bg-red-600"
                    startContent={<ShoppingCartIcon />} onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
            </div>
        </>
    );
};

export default AddToCartContent;