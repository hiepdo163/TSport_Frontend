'use server';
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import './homeContent.css';
type Props = {}

const HomeContent = (props: Props) => {
    return (
        <div className="max-w-[1000px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
            <Card className="col-span-12 sm:col-span-6 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Mới</p>
                    <h4 className="text-white font-medium text-large">Áo MU</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Áo mới"
                    className="z-0 w-full h-full object-cover zoom_on_hover"
                    fallbackSrc="https://www.tfcfootball.com.my/wp-content/uploads/2023/07/IP1726-800x800.png"
                    src="https://www.tfcfootball.com.my/wp-content/uploads/2023/07/IP1726-800x800.png"
                />
            </Card>
            <Card className="col-span-12 sm:col-span-6 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Bán chạy</p>
                    <h4 className="text-white font-medium text-large">Áo Barcelona</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover zoom_on_hover"
                    src="https://wallpapercave.com/wp/wp12923856.jpg"
                    fallbackSrc="https://wallpapercave.com/wp/wp12923856.jpg"
                />
            </Card>
            {/* <Card className="col-span-12 sm:col-span-4 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
                    <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="https://nextui.org/images/card-example-2.jpeg"
                />
            </Card> */}
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                    <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="https://nextui.org/images/card-example-6.jpeg"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Available soon.</p>
                        <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Notify Me
                    </Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">HOT SALE 50%</p>
                    <h4 className="text-white/90 font-medium text-xl">Áo đt VN</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover zoom_on_hover"
                    src="https://thanhnien.mediacdn.vn/Uploaded/lanphuong/2018_01_08/ngay81aodau_ylwd_YKYY.jpg?width=600"
                    
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Áp dụng cho đơn hàng từ ngày ...</p>
                            <p className="text-tiny text-white/60">Sales 50%</p>
                        </div>
                    </div>
                    <Button radius="full" size="md" className="bg-red-600 text-white uppercase">Mua ngay</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default HomeContent;