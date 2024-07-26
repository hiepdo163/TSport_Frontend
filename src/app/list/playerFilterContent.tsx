'use client';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {
    players: PlayerFilter[];
    playerIds: number[];
};

const PlayerFilterContent = ({ players, playerIds }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCheck = (value: string[]) => {
        const sortColumn = searchParams.get('sortColumn') || 'id';
        const orderByDesc = searchParams.get('orderByDesc') || 'true';
        const clubIdsParam = searchParams.get('clubIds') || '';
        const seasonIdsParam = searchParams.get('seasonIds') || '';
        const startPriceParam = searchParams.get('startPrice') || '';
        const endPriceParam = searchParams.get('endPrice') || '';

        let url = `/list?sortColumn=${sortColumn}&orderByDesc=${orderByDesc}&page=1`;

        if (value.length > 0) {
            url += `&playerIds=${value.join(',')}`;
        }

        if (clubIdsParam && clubIdsParam !== '') {
            url += `&clubIds=${clubIdsParam}`;
        }

        if (seasonIdsParam && seasonIdsParam !== '') {
            url += `&seasonIds=${seasonIdsParam}`;
        }

        if (startPriceParam && startPriceParam !== '') {
            url += `&startPrice=${startPriceParam}`;
        }

        if (endPriceParam && endPriceParam !== '') {
            url += `&endPrice=${endPriceParam}`;
        }

        // Use router.push to navigate with updated query parameters
        router.push(url);
    };

    return (
        <div className="filter-section">
            <CheckboxGroup
                label='Cầu thủ'
                color="danger"
                onValueChange={handleCheck}
            >
                {players.map((player, index) => (
                    <Checkbox key={index} value={player.id.toString()}
                        checked={playerIds.includes(player.id)}>{player.name}</Checkbox>
                ))}

            </CheckboxGroup>
        </div>
    );
};

export default PlayerFilterContent;