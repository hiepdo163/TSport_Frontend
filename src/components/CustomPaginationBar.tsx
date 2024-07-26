'use client';
import { Pagination } from '@nextui-org/react';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
type Props = {
    page: number;
    totalPages: number;
}

const CustomPaginationBar = ({page, totalPages}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const sortColumn = searchParams.get('sortColumn') || 'id';
        const orderByDesc = searchParams.get('orderByDesc') || 'true';
        const playerIdsParam = searchParams.get('playerIds') || '';
        const seasonIdsParam = searchParams.get('seasonIds') || '';
        const clubIdsParam = searchParams.get('clubIds') || '';
        const startPriceParam = searchParams.get('startPrice') || '';
        const endPriceParam = searchParams.get('endPrice') || '';

        let url = `/list?sortColumn=${sortColumn}&orderByDesc=${orderByDesc}&page=${newPage}`;

        if (clubIdsParam.length > 0) {
            url += `&clubIds=${clubIdsParam}`;
        }

        if (seasonIdsParam.length > 0) {
            url += `&seasonIds=${seasonIdsParam}`;
        }

        if (playerIdsParam && playerIdsParam !== '') {
            url += `&playerIds=${playerIdsParam}`;
        }

        if (startPriceParam && startPriceParam !== '') {
            url += `&startPrice=${startPriceParam}`;
        }

        if (endPriceParam && endPriceParam !== '') {
            url += `&endPrice=${endPriceParam}`;
        }

        router.push(url);
    };

    return (
        <Pagination color="danger" onChange={handlePageChange} page={page} showControls total={totalPages} initialPage={1} />
    );
};

export default CustomPaginationBar;