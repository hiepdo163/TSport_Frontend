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
import MainNavBar from "@/components/MainNavBar";
import { signout } from "../signin/actions";

const ShirtDetail = () => {
    return (
        <>
            {/* <Header /> */}
            <MainNavBar signout={signout} />
            <div className="main-container">
                <nav className="breadcrumb" style={{ display: "flex" }}>
                    <Link href={"/"}><span >Home/ Áo đấu/ </span></Link>
                    <span>Chi tiết áo đấu</span>
                </nav>
                <div className="container-fluid-home">
                    <div style={{ width: "40%" }}>
                        <Image src={OIPImage} height={300} width={300} alt={""} />
                    </div>
                    <div style={{ width: "50%" }}>
                        <div style={{ width: "90%", border: "2px solid #000000", borderRadius: "20px", padding: "30px" }}>
                            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Product Name</h2>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Rating defaultValue={2.5} precision={0.5} size="large" readOnly />
                                <span>(99 đánh giá)</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                                <span style={{ marginRight: "30px" }}>Kích thước:</span>
                                {/* <RadioGroup row >
                                    <FormControlLabel value="X" control={<Radio />} label="X" />
                                    <FormControlLabel value="XL" control={<Radio />} label="XL" />
                                    <FormControlLabel value="XXL" control={<Radio />} label="XXL" />
                                </RadioGroup> */}
                                <RadioGroup color="danger">
                                    <div className="flex flex-row gap-4">
                                        <Radio value="X">X</Radio>
                                        <Radio value="XL">XL</Radio>
                                        <Radio value="SM">SM</Radio>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                                <span style={{ marginRight: "30px" }}>Màu sắc:</span>
                                {/* <RadioGroup row >
                                    <FormControlLabel value="red" control={<Radio />} label="Đỏ" />
                                    <FormControlLabel value="orange" control={<Radio />} label="Cam" />
                                    <FormControlLabel value="yellow" control={<Radio />} label="Vàng" />
                                </RadioGroup> */}
                                <RadioGroup color="danger">
                                    <div className="flex flex-row gap-4">
                                        <Radio value="Đỏ">Đỏ</Radio>
                                        <Radio value="Cam">Cam</Radio>
                                        <Radio value="Vàng">Vàng</Radio>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input type="number" label='Số lượng' className="w-1/3" />
                                <Button type="button"
                                    className="text-white bg-red-600"
                                    startContent={<ShoppingCartIcon />}>Thêm vào giỏ hàng</Button>
                                {/* <div>
                                    <Button style={{ width: "60px", height: "60px", backgroundColor: "#f8d97b" }}><RemoveIcon /></Button>
                                    <TextField style={{ height: "60px" }} />
                                    <Button style={{ width: "60px", height: "60px", backgroundColor: "#f8d97b" }}><AddIcon /></Button>
                                </div>
                                <Button style={{ height: "60px", backgroundColor: "#f8d97b", marginLeft: "50px" }}>
                                    <ShoppingCartIcon />
                                    Thêm vào giỏ
                                </Button> */}
                            </div>
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
    )
}

export default ShirtDetail;