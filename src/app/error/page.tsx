import MainNavBar from "@/components/MainNavBar";
import { signout } from "../signin/actions";
import Footer from '@/components/footer/footer';

export default function ErrorPage() {
    return (
        <>
        <MainNavBar signout={signout} />
          <h1 className="text-red-600">OOPS, Something went wrong</h1>
          <Footer/>
        </>
    );
}