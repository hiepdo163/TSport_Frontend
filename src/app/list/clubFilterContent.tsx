'use client';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {
    clubs: ClubFilter[];
    clubIds: number[];
}

const ClubFilterContent = ({ clubs, clubIds }: Props) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCheck = (value: string[]) => {
        const sortColumn = searchParams.get('sortColumn') || 'id';
        const orderByDesc = searchParams.get('orderByDesc') || 'true';
        const playerIdsParam = searchParams.get('playerIds') || '';
        const seasonIdsParam = searchParams.get('seasonIds') || '';
        const startPriceParam = searchParams.get('startPrice') || '';
        const endPriceParam = searchParams.get('endPrice') || '';

        let url = `/list?sortColumn=${sortColumn}&orderByDesc=${orderByDesc}&page=1`;

        if (value.length > 0) {
            url += `&clubIds=${value.join(',')}`;
        }

        if (playerIdsParam && playerIdsParam !== '') {
            url += `&playerIds=${playerIdsParam}`;
        }

        if (seasonIdsParam.length > 0) {
            url += `&seasonIds=${seasonIdsParam}`;
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
        <div className="filter-section">
            <CheckboxGroup
                label='Câu lạc bộ'
                color="danger"
                onValueChange={handleCheck}
            >
                {clubs.map((club, index) => (
                    <Checkbox value={club.id.toString()} key={index}
                        checked={clubIds.includes(club.id)}>{club.name}</Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    );
};

export default ClubFilterContent;