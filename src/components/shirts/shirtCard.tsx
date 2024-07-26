import { formatPrice } from "@/utils/priceUtils";
import { Button, Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
    item: PagedShirt;
    index: number;
}


const ShirtCard = ({ item, index }: Props) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Card shadow="md" key={index} className="product-item">
                <CardBody className=" p-0 product-img">
                    <Image className="img-fluid w-full cursor-pointer" 
                    width={200} height={30} src={item.images[0]?.url} alt={item.name} />
                    <Link href={`/list/${item.id}`} style={{ height: "0" }}>
                        <div className="product-action ">
                            <div className="btn btn-outline-dark btn-square" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h3 style={{ margin: "0" }}>Chi tiết</h3>
                            </div>
                        </div>
                    </Link>
                </CardBody>
                <CardFooter className="text-center" style={{ flexDirection: "column" }}>
                    <h3 style={{ margin: "0" }}>{item.name}</h3>
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1rem"
                    }}>
                        <h5 style={{ margin: "0" }} className="font-bold text-red-600">{formatPrice(item["shirt-edition"]["discount-price"])} VNĐ</h5>
                        <h6 className="text-muted"><del>{formatPrice(item["shirt-edition"]["stock-price"])} VNĐ</del></h6>
                    </div>
                    <Link href={`/list/${item.id}`} color="danger">Chi tiết</Link>
                    {/* <Rating defaultValue={item.rating} precision={0.5} readOnly /> */}
                </CardFooter>
            </Card>
        </Suspense>
    );
};

export default ShirtCard;