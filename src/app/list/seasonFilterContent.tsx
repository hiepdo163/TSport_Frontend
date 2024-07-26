'use client';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';

import React from 'react'

type Props = {
    seasons: SeasonFilter[];
    seasonIds: number[];
};

const SeasonFilterContent = ({ seasons, seasonIds }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCheck = (value: string[]) => {
        const sortColumn = searchParams.get('sortColumn') || 'id';
        const orderByDesc = searchParams.get('orderByDesc') || 'true';
        const playerIdsParam = searchParams.get('playerIds') || '';
        const clubIdsParam = searchParams.get('clubIds') || '';
        const startPriceParam = searchParams.get('startPrice') || '';
        const endPriceParam = searchParams.get('endPrice') || '';

        let url = `/list?sortColumn=${sortColumn}&orderByDesc=${orderByDesc}&page=1`;
        
        if (value.length > 0) {
           url += `&seasonIds=${value.join(',')}`;
        }

        if (playerIdsParam && playerIdsParam !== '') {
            url += `&playerIds=${playerIdsParam}`;
        }

        if (clubIdsParam && clubIdsParam !== '') {
            url += `&clubIds=${clubIdsParam}`;
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
            <CheckboxGroup label='Mùa giải' color='danger'
                onValueChange={handleCheck}>
                {seasons.map((season, index) => (
                    <Checkbox key={index} value={season.id.toString()}
                        checked={seasonIds.includes(season.id)}>{season.name}</Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    );
};

export default SeasonFilterContent;