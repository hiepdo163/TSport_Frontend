"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
// import { CardAgents } from "./card-agents";
// import { CardTransactions } from "./card-transactions";
import { Button, Card, CardBody, Chip, DatePicker, Link, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import NextLink from "next/link";
import { parseDate} from "@internationalized/date";
import { clubOrderReport } from "@/app/service/order_service";
import { fetchAllClubsFilter } from "@/app/service/club_service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTShirt, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

// const Chart = dynamic(
//     () => import("../charts/steam").then((mod) => mod.default),
//     {
//         ssr: false,
//     }
// );

const Content = () => {
      const [clubs, setClubs] = useState<PagedClub[]>([]);

      const [quantityBySize, setQuatiyBySize] = useState<OrderInChart[]>([]);
      const [orderReport, setOrderReport] = useState<OrderReport>();
      const [orders, setOrders] = useState<OrderInChart[]>([]);

      const [clubId, setClubId] = useState("");
      const [start, setStart] = useState("");
      const [end, setEnd] = useState("");

      useEffect(() => {
        fetchData();
      },[])

      useEffect(() => {
        fetchData();
      },[clubId,start,end])

      const fetchData = async () =>{
        try {
      const response = await clubOrderReport(Number(clubId), start, end);
      setOrderReport(response);
      setQuatiyBySize(response["shirt-quantities-by-size"]);
      setOrders(response.orders)
      const resp = await fetchAllClubsFilter();
      setClubs(resp);
    } catch (error) {
      console.error("Error fetching seasons", error);
    }
      }


   return (
     <div className="h-full lg:px-6">
        <div className="mt-6 gap-6 flex flex-row w-full">
                <Select
                        label="CLB"
                        className="max-w-[400px] p-2"
                        defaultSelectedKeys={[clubId]}
                        onChange={(e) => setClubId(e.target.value)}
                      >
                        {clubs.map((club) => (
                          <SelectItem key={String(club.id)}>{club.name}</SelectItem>
                        ))}
                      </Select>
                      <DatePicker label="Ngày bắt đầu" className="max-w-[284px]" />
                      <DatePicker label="Ngày kết thúc" className="max-w-[284px]" />
                      </div>
        <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
            
            <div className="mt-6 gap-6 flex flex-col w-full">
                {/* Card Section Top */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Available Balance</h3>
                    <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
                        {/* <CardBalance1 /> */}
                        <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
                            <CardBody className="py-5 overflow-hidden flex flex-row justify-center alaign-center w-full">
                                <div className="w-1/2 h-full flex gap-3 justify-center alaign-center">
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        className="text-white-500"
                                        size="6x"
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-2.5 py-2 items-center">
                                        <span className="text-white text-xl">Tổng số đơn hàng:</span>
                                        <span className="text-white text-4xl font-semibold">{orderReport?.["total-order-count"]}</span>
                                    
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="xl:max-w-sm bg-secondary rounded-xl shadow-md px-3 w-full">
                            <CardBody className="py-5 overflow-hidden flex flex-row justify-center alaign-center w-full">
                                <div className="w-1/2 h-full flex gap-3 justify-center alaign-center">
                                    <FontAwesomeIcon
                                        icon={faTShirt}
                                        className="text-white-500"
                                        size="6x"
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-2.5 py-2 items-center">
                                        <span className="text-white text-xl">Tổng số áo bán ra:</span>
                                        <span className="text-white text-4xl font-semibold">{orderReport?.["total-shirt-quantity"]}</span>
                                    
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
                            <CardBody className="py-5 overflow-hidden flex flex-row justify-center alaign-center w-full">
                                <div className="w-1/2 h-full flex gap-3 justify-center alaign-center">
                                    <FontAwesomeIcon
                                        icon={faMoneyBill}
                                        className="text-white-500"
                                        size="6x"
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-2.5 py-2 items-center">
                                        <span className="text-white text-xl">Tổng lợi nhuận:</span>
                                        <span className="text-white text-2xl font-semibold">{orderReport?.["total-revenue"].toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</span>
                                    
                                </div>
                            </CardBody>
                        </Card>
                        {/* <CardBalance2 />
                        <CardBalance3 /> */}
                    </div>
                </div>

                {/* Chart */}
                <div className="h-1/2 flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Statistics</h3>
                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                        {/* <Chart /> */}
                        {quantityBySize.length == 0 ? (
                            <div className="w-full z-20">
            <div className="flex justify-center">
                <h3>Không có dữ liệu để hiển thị</h3></div></div>) : (
                            <div className="w-full z-20">
            <div id="chart" className="flex justify-center">
                <BarChart width={600} height={400} data={quantityBySize}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="size" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#736ed7" />
                </BarChart>
            </div>
        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Left Section
            <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
                <h3 className="text-xl font-semibold">Section</h3>
                <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
                    <CardAgents />
                    <CardTransactions />
                </div>
            </div> */}
        </div>

        {/* Table Latest Users */}
        <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
            <div className="flex  flex-wrap justify-between">
                <h3 className="text-center text-xl font-semibold">Latest Transactions</h3>
            </div>
            {/* <TableWrapper /> */}
            <Table aria-label="Orders Table">
            <TableHeader>
              <TableColumn className="text-2xl">Mã đơn hàng</TableColumn>
              <TableColumn className="text-2xl">Tổng tiền</TableColumn>
              <TableColumn className="text-2xl">Ngày đặt</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
            </TableHeader>
            {orders?.length == 0 ? (
              <TableBody emptyContent={"No data to display."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {orders?.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xl">
                      {order.code}
                    </TableCell>
                    <TableCell className="text-xl">
                      {order.total.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} VNĐ
                    </TableCell>
                    <TableCell className="text-xl">
                      {order["order-date"].split("T")[0] + " " + order["order-date"].split("T")[1]}
                    </TableCell>
                    <TableCell className="text-xl">
                      <Chip
                        size="md"
                        variant="flat"
                        color={
                          order.status === "Paid"
                            ? "success"
                            : order.status === "Pending"
                              ? "primary"
                              : order.status === "OnDelivery"
                                ? "warning" :
                                order.status === "Finished"
                                  ? "secondary" :
                                  "danger"
                        }
                      >
                        {order.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
    </div>
   )
};

export default Content;