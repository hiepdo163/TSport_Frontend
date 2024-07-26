'use client';
import { Select, SelectItem } from '@nextui-org/react';
import React from 'react'
import { Selection } from '@react-types/shared'
import { useRouter } from 'next/navigation';

type Props = {
    initialSortColumn: string;
    initialOrderByDesc: boolean;
};

const options = [
    {
        value: 'sortColumn=id&orderByDesc=true',
        label: 'Mặc định'
    },
    {
        value: 'sortColumn=price&orderByDesc=true',
        label: 'Giá từ cao đến thấp'
    },
    {
        value: 'sortColumn=price&orderByDesc=false',
        label: 'Giá từ thấp đến cao',
    }
];

const SortSelect = ({ initialSortColumn, initialOrderByDesc }: Props) => {

    const router = useRouter();

    const selectedParam = `sortColumn=${initialSortColumn}&orderByDesc=${initialOrderByDesc}`;

    const handleSelectionChange = (keys: Selection) => {
        if (keys === 'all') {
            return;
        }

        const newKeys = new Set(Array.from(keys).map(String));
        const firstKey = newKeys.values().next().value;
        console.log(firstKey);

        router.push(`/list?${firstKey}`);
    };

    return (
        <Select
            label="Sắp xếp theo"
            className="max-w-xs"
            onSelectionChange={handleSelectionChange}
            defaultSelectedKeys={'sortColumn=id&orderByDesc=true'}
            value={selectedParam}
        >
            {options.map((option, index) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
    );
};

export default SortSelect;