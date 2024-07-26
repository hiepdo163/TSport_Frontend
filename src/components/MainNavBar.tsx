'use client';
import { Badge, Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { AcmeLogo } from './icons/acmelogo';
import AppIcon from './icons/appIcon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createClient } from '@/utils/supabase/client';
import useSWR from 'swr';

type Props = {
    signout: () => Promise<void>;
};

const getCurrentAuthUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    return { data, error };
};

const menuItems = [
    "Cá nhân",
    "Áo đấu",
    "Câu lạc bộ",
    "Cầu thủ",
    "Log Out"
];

const MainNavBar = ({ signout }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const { data, error } = useSWR('getCurrentAuthUser', getCurrentAuthUser);

    const user = data?.data.user;
    const isAuthenticated: boolean = !!user;


    const performSignout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        await signout();
    };


    return (
        <Navbar

            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}>

            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            {/*mobile view */}
            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link className='text-inherit flex gap-1' href='/'>
                        <AppIcon size='1.5rem' />
                        <p className="font-bold text-inherit text-[1.5rem]">TSport</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand >
                    <Link className='text-inherit flex gap-1' href='/'>
                        <AppIcon size='1.5rem' />
                        <p className="font-bold text-inherit text-[1.5rem]">TSport</p>
                    </Link>
                </NavbarBrand>
                <NavbarItem isActive>
                    <Link color="foreground" className='text-red-600' href={'/list'}>
                        Áo đấu
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href="">
                        Câu lạc bộ
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="">
                        Cầu thủ
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className='flex'>
                    <Link href={'/cart/details'} className='text-inherit'>
                        <Badge content="1" color='danger'>
                            <ShoppingCartIcon />
                            {/* <div className="">Giỏ hàng</div> */}
                        </Badge>
                    </Link>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    {isAuthenticated ? (
                        <Link href="/" onClick={performSignout} className='text-red-600'>Đăng xuất</Link>
                    ) : (
                        <Link href="/signin" className='text-red-600'>Đăng nhập</Link>
                    )}
                </NavbarItem>
            </NavbarContent>

            {/*mobile view */}
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href=""
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default MainNavBar;