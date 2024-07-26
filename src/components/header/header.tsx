'use server';
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from "@nextui-org/react";
import "./header.css";
import Image from 'next/image';

import appLogo from '../../img/logo.svg';
const Header = () => {
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row-header">
                    <div style={{ width: "20%" }}>
                        <Link className="header__logo flex gap-2
                        text-[1.7rem]" href={"/"}>
                            {/* <img src="img/logo.png" alt="Logo"/> */}
                            <Image src={appLogo} height={30} width={30} alt={""} />
                            <div className="">TSport</div>
                        </Link>
                    </div>
                    <div style={{ width: "40%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "80%" }}>
                            <Input
                                startContent={<SearchIcon style={{ color: "#000000" }} />}
                                isClearable
                                className="w-full text-black"
                                classNames={{
                                    input: "w-full",
                                    mainWrapper: "w-full",
                                }}
                                placeholder="Tìm kiếm..."
                            />
                        </div>
                    </div>
                    <div style={{ width: "20%", display: "flex", alignItems: "center" }}>
                        <div className="header__right">
                            <Link className="cart flex items-center" href={""}>
                                <ShoppingCartIcon style={{ color: "#ffff", width: "40px", height: "40px" }} />
                                <div className="text-[1.25rem]">Giỏ hàng</div>
                            </Link>
                            {/* <div style={{ display: "flex", alignItems: "center", margin: "0 20px" }}>
                                <ShoppingCartIcon style={{ color: "#ffff", width: "40px", height: "40px" }} />
                            </div>
                            <div className="header__right__auth flex">
                                <Link href={"/signin"} style={{ display: "flex", cursor: "pointer" }}>
                                    Đăng nhập
                                </Link>
                                <div style={{ textAlign: "left" }}>
                                    Xin chào,
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;