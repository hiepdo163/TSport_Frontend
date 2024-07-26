"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "@/components/table/table";
import AddUserModal from "./AddUserModal";

const Accounts = () => {
    return (
        <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <ul className="flex">
                <li className="flex gap-2">
                    <HouseIcon />
                    <Link href={"/"}>
                        <span>Trang chủ</span>
                    </Link>
                    <span> / </span>{" "}
                </li>

                <li className="flex gap-2">
                    <UsersIcon />
                    <span>Khách hàng</span>
                    <span> / </span>{" "}
                </li>
                <li className="flex gap-2">
                    <span>Danh sách</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">All Accounts</h3>
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        placeholder="Search users"
                    />
                    <SettingsIcon />
                    <TrashIcon />
                    <InfoIcon />
                    <DotsIcon />
                </div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <AddUserModal />
                    <Button color="primary" startContent={<ExportIcon />}>
                        Export to CSV
                    </Button>
                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapper />
            </div>
        </div>
    );
};

export default Accounts;