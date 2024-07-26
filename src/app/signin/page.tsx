'use server';
import React from "react";
import "./signin.css";
import { Button, Input } from "@nextui-org/react";
import Footer from "@/components/footer/footer";
import Link from "next/link";
import Header from "@/components/header/header";
import Image from "next/image";
import exGround from "../../img/OIP.jpg";
import MainNavBar from "@/components/MainNavBar";
import { signin } from "./actions";
import SignInButton from "./signInButton";
import MailIcon from '@mui/icons-material/Mail';
import { signout } from "../signin/actions";

const SignIn = () => {
  return (
    <>
      {/* <MainNavBar /> */}
      <MainNavBar signout={signout} />
      <div className="main-container">
        <div className="container" style={{ height: "70vh" }}>
          <div className="login-container">
            <form className="left_side-login" style={{ width: "35%" }} id="signin_form">
              <h1 id="title-text" className="mb-3 font-bold text-xl">Chào mừng sự trở lại của bạn</h1>
              <Input label='Email'
                name="email" type="email" variant='bordered' className="text-wrapper-5 mb-3"
                required />
              <Input label='Mật khẩu' name="password" variant='bordered' className="text-wrapper-5"
                type="password"
                required />

              <SignInButton />

              <Link href={"/signup"}
                style={{ textDecoration: "none", marginTop: "10px", color: "blue", cursor: "pointer" }}
              >
                {" "}
                Chưa có tài khoản ?
              </Link>
            </form>

            <div className="right_side-login custom-hover" style={{ width: "65%" }}>
              <Image src={exGround} alt="bg1" />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SignIn;