import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import React from 'react';
import exGround from "../img/OIP.jpg";
import Link from 'next/link';
import Image from 'next/image';
import "./home.css";
import MainNavBar from '@/components/MainNavBar';
import HomeContent from '@/components/home/homeContent';
import { signout } from "./signin/actions";

const home = () => {
    return (
        <>
            {/* <Header /> */}
            {/* <MainNavBar/> */}
            <MainNavBar signout={signout} />
            <main className="main-container flex justify-center">
                <HomeContent />
            </main>
            <Footer/>
            {/* <div className="main-container">
                <section className="discount">
                    <div className="container">
                        <div style={{ width: "80%", display: "flex" }}>
                            <div style={{ width: "50%", paddingLeft: "15px" }}>
                                <Image src={exGround} alt="discount" style={{ width: "auto", height: "100%" }} />
                            </div>
                            <div style={{ width: "50%", padding: "0" }}>
                                <div className="discount__text">
                                    <div style={{ width: "60%", borderRadius: "20%", backgroundColor: "#ffff" }}>
                                        <div className="discount__text__title">
                                            <span>Discount</span>
                                            <h2>Summer 2019</h2>
                                            <h5><span>Sale</span> 50%</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div style={{ width: "100%", padding: "0 10%" }}>
                    <h4 style={{ fontSize: "2rem" }}>Bán chạy nhất</h4>
                </div>
                <div className="container-fluid-home">
                    <div style={{ width: "20%" }}>
                        <div className="product-item">
                            <div className="product-img">
                                <Image className="img-fluid" src={exGround} alt="abc" />
                                <Link href={"/detail"}>
                                    <div className="product-action">
                                        <div className="btn btn-outline-dark btn-square" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <h3 style={{ margin: "0" }}>Xem chi tiết</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="text-center">
                                <h3 style={{ margin: "0" }}>Product Name</h3>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <h5 style={{ margin: "0" }}>$123.00</h5>
                                    <h6 className="text-muted"><del>$123.00</del></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid-home">
                    <Link href={"list"} style={{ width: "30%", cursor: "pointer" }}>
                        <div className="categories__item set-bg" >
                            <div className="categories__text">
                                <h4>Men’s fashion</h4>
                                <p>358 items</p>
                                <p>Shop now</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div> */}
            
        </>
    );
};

export default home;