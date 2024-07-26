import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Content = dynamic(() => import("@/components/home/content"));

const Home: NextPage = () => {
  return <Content />;
};

export default Home;