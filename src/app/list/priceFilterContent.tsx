'use client';
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
    initialStartPrice: number;
    initialEndPrice: number;
}

const PriceFilterContent = ({initialStartPrice, initialEndPrice}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [startPrice, setStartPrice] = useState<number>(initialStartPrice);
    const [endPrice, setEndPrice] = useState<number>(initialEndPrice);

    const handlePriceFilter = async () => {
        const sortColumn = searchParams.get('sortColumn') || 'id';
        const orderByDesc = searchParams.get('orderByDesc') || 'true';
        const clubIdsParam = searchParams.get('clubIds') || '';
        const playerIdsParam = searchParams.get('playerIds') || '';
        const seasonIdsParam = searchParams.get('seasonIds') || '';

        if (startPrice >= endPrice) {
            await Swal.fire({
                icon: 'info',
                title: 'Không thể tìm kiếm',
                text: 'Giá bắt đầu phải nhỏ hơn giá kết thúc'
            });
            return;
        }

        let url = `/list?startPrice=${startPrice}&endPrice=${endPrice}&sortColumn=${sortColumn}&orderByDesc=${orderByDesc}&page=1`;

        if (clubIdsParam && clubIdsParam !== '') {
            url += `&clubIds=${clubIdsParam}`;
        }

        if (playerIdsParam && playerIdsParam !== '') {
            url += `&playerIds=${playerIdsParam}`;
        }

        if (seasonIdsParam && seasonIdsParam !== '') {
            url += `&seasonIds=${seasonIdsParam}`;
        }
        
        console.log(`Filter by price from ${startPrice} to ${endPrice}`);
        router.push(url);
    };

    return (
        <>
            <h2>Giá</h2>
            <div className="filter-section" style={{ display: "flex", alignItems: "center" }}>
                <Input label="Từ" type="number"
                    value={startPrice.toString()}
                    onChange={(e) => setStartPrice(+e.target.value)} />
                <ArrowRightAltIcon style={{ width: "10%" }} />
                <Input label="Đến" type="number"
                    value={endPrice.toString()}
                    onChange={(e) => setEndPrice(+e.target.value)} />
            </div>
            <Button type='button' color='danger' onClick={handlePriceFilter}>Tìm theo giá</Button>
        </>
    )
}

export default PriceFilterContent