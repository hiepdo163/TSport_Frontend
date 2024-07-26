'use client';
import { Select, SelectItem } from '@nextui-org/react';
import React, { CSSProperties } from 'react'

type Props = {
    label: string;
    items: { key: string, label: string }[];
    style?: CSSProperties;
    className?: string;
}

const ClientSelect = ({ label, items, style, className }: Props) => {
    return (
        <Select
            items={items}
            label={label}
            style={style}
            className={className}
        >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </Select>
    );
};

export default ClientSelect;