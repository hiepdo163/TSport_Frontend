'use server';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import "./footer.css";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer py-10" style={{ width: "100%", bottom: "0" }}>
      <div className="container-footer flex items-center">
        <div className='flex flex-col gap-10' style={{ width: "60%" }}>
          <div className="row-footer" style={{ display: "flex", justifyContent: "center" }}>
            <div className="footer__nav">
              <ul>
                <li style={{ cursor: "pointer" }}><Link href={"/"}>Homepage</Link></li>
                <li style={{ cursor: "pointer" }}><Link href={"/"}>Our Rules</Link></li>
                <li style={{ cursor: "pointer" }}><Link href={"/"}>Contacts</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-contact row-footer text-[1.2rem]">
            <p>
              Copyright &copy;{new Date().getFullYear()}; All rights reserved | This template is made by <a href="https://colorlib.com" target="_blank">Nhom5</a>
            </p>
          </div>
        </div>

        <div style={{ width: "40%" }} className="footer__nav flex flex-col items-center">
          {/* <h1>Follow Us</h1> */}
          <ul>
            <li style={{ cursor: "pointer" }}><FacebookIcon style={{ width: "50px", height: "50px" }} /></li>
            <li style={{ cursor: "pointer" }}><InstagramIcon style={{ width: "50px", height: "50px" }} /></li>
            <li style={{ cursor: "pointer" }}><TwitterIcon style={{ width: "50px", height: "50px" }} /></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;