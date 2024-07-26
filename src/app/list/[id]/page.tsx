import React from 'react'
import { Avatar, Pagination, Rating, TextField } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Header from "@/components/header/header";
import Link from "next/link";
import Image from 'next/image';
import Footer from "@/components/footer/footer";
import "./detail.css";
import OIPImage from '../../img/OIP.jpg';
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { fetchShirtDetails } from '@/app/service/shirt_service';
import { redirect } from 'next/navigation';
import AddToCartContent from '../addToCartContent';
import MainNavBar from '@/components/MainNavBar';
import { signout } from '@/app/signin/actions';
import { formatPrice } from '@/utils/priceUtils';

type Props = {
    params: {
        id?: number;
    }
}


const ShirtDetailsPage = async ({ params }: Props) => {
    if (params.id === undefined) {
        redirect("/");
    }


    const shirt: ShirtDetails = await fetchShirtDetails(params.id);
    console.log({ id: shirt.id });


    return (
        <>
            <MainNavBar signout={signout}/>
            <div className="main-container">
                {/* <h1>{params.id}</h1> */}
                <nav className="breadcrumb" style={{ display: "flex" }}>
                    <Link href={"/"}><span >Home/ Áo đấu/ </span></Link>
                    <span>Chi tiết áo đấu</span>
                </nav>
                <div className="container-fluid-home">
                    <div style={{ width: "40%" }}>
                        <Image src={shirt.images[0].url} height={300} width={300} alt={""} />
                    </div>
                    <div style={{ width: "50%" }}>
                        <div style={{ width: "90%", border: "2px solid #000000", borderRadius: "20px", padding: "30px" }}>
                            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>{shirt.name}</h2>
                            {/* <div style={{ display: "flex", alignItems: "center" }}>
                            <Rating defaultValue={2.5} precision={0.5} size="large" readOnly />
                            <span>(99 đánh giá)</span>
                        </div> */}
                            <h2 className='text-gray-400'><del>{formatPrice(shirt['shirt-edition']['stock-price'])} VNĐ</del></h2>
                            <h2 style={{
                                fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem",
                                color: 'red'
                            }}>{formatPrice(shirt['shirt-edition']['discount-price'])} VNĐ</h2>
                            <AddToCartContent shirtId={shirt.id} />
                        </div>
                    </div>
                </div>
                <div className="container-fluid-home">
                    <div style={{ padding: "30px", border: "2px solid #000000", borderRadius: "20px" }}>
                        <div className="tab-content">
                            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Thông tin sản phẩm</h2>
                            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                            <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>

                            <div style={{ display: "flex" }}>
                                <div style={{ width: "60%", padding: "20px" }}>
                                    <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Feedback:</h2>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "15%" }}>
                                            <Avatar src="img/user.jpg" alt="Image" style={{ width: "80px", height: "80px" }} />
                                        </div>
                                        <div style={{ width: "85%" }}>
                                            <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly />
                                            <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                        </div>
                                    </div>
                                    <Pagination
                                        count={Math.ceil(17 / 7)}
                                    />
                                </div>
                                <div style={{ width: "40%", padding: "20px" }}>
                                    <h2>Thêm feedback</h2>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <p style={{ marginRight: "10px" }}>Your Rating*:</p>
                                        <Rating defaultValue={3} precision={0.5} size="large" />
                                    </div>
                                    <form>
                                        <div style={{ display: "flex", alignItems: "start" }}>
                                            <p style={{ marginRight: "10px" }}>Your Review*:</p>
                                            <TextField
                                                multiline
                                                rows={4}
                                                value={""}
                                                style={{ width: "80%" }}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
            <Footer/>
        </>
    );
};

export default ShirtDetailsPage;