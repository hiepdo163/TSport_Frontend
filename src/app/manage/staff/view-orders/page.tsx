"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon"
import { Button, Chip, DatePicker, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import { faRemove, faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cancelOrder, fetchAllOrders, fetchOrder } from "@/app/service/order_service";
import Swal from "sweetalert2";

const OrdersSection = () => {
  const [viewDetail, setViewDetail] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [orders, setOrders] = useState<PagedOrder[]>([]);
  const [account, setAccount] = useState<BasicAccount | undefined>();
  const [details, setDetails] = useState<FullOrderDetails[]>([]);

  const [selectOrder, setSelectedOrder] = useState(0);
  const [orderStatus, setOrderStatus] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [page, start, end])

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders(page, start, end);
      setOrders(response.items);
      setTotalPage(response["total-pages"]);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  }

  const modalDetailOpen = async (id: number) => {
    setViewDetail(true);
    try {
      const response = await fetchOrder(id);
      setAccount(response["created-account"]);
      setDetails(response["order-details"]);
    } catch (error) {
      console.error("Error fetching order", error);
    }
  }

  const modalClose = () => {
    setViewDetail(false);
    setIsConfirm(false);
    setSelectedOrder(0);
    setAccount(undefined);
    setDetails([]);
  }

  const handleCancelOrder = async () => {
    try {
        await cancelOrder(selectOrder);
      modalClose();
      await Swal.fire({
        title: 'Đã hủy đơn hàng!',
        icon: 'success'
      });
      fetchOrders();
      
    } catch (error) {
      console.error("Error cancel order", error);
    }
  }

  return (
    <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/manage/staff/tshirt"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-black-500"
          />
          <span>Danh sách đơn hàng</span>
        </li>
      </ul>
      {/* <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <DatePicker label='Ngày đầu' variant='bordered' className="w-full p-2" value={start}/>
          <DatePicker label='Ngày cuối' variant='bordered' className="w-full p-2" />
          <Button onClick={() => {setStart(""); setEnd("")}} color='primary'>Xóa filter</Button>
        </div>
      </div> */}
      <div className="max-w-[95rem] mx-auto w-full">
        {/* <TableWrapper /> */}
        <div className=" w-full flex flex-col gap-4">
          <Table aria-label="Orders Table">
            <TableHeader>
              <TableColumn className="text-2xl">Mã đơn hàng</TableColumn>
              <TableColumn className="text-2xl">Tổng tiền</TableColumn>
              <TableColumn className="text-2xl">Ngày đặt</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
              <TableColumn className="text-2xl text-center">...</TableColumn>
            </TableHeader>
            {orders.length == 0 ? (
              <TableBody emptyContent={"No data to display."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {orders.map((order, index) => (
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
                          order.status === "Processed"
                            ? "success"
                            : order.status === "Pending"
                              ? "primary"
                              : order.status === "Delivered"
                                ? "warning" :
                                order.status === "Shipped"
                                  ? "secondary" :
                                  "danger"
                        }
                      >
                        {order.status}
                      </Chip>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Button
                        className="w-1/6 text-black"
                        aria-label="detail"
                        onClick={() => modalDetailOpen(order.id)}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-white-500"
                        />
                      </Button>
                      {order.status == "Pending" && (
                        <Button
                        className="w-1/6 bg-red-500 text-white"
                        aria-label="cancel"
                        onClick={() => {
                          setIsConfirm(true);
                          setSelectedOrder(order.id)
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faRemove}
                          className="text-white-500"
                        />
                      </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <Pagination showControls total={totalPage} initialPage={1} onChange={(newPage) => setPage(newPage)} />

          <Modal size="xl" isOpen={isConfirm} onClose={() => modalClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Xác nhận
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-full flex items-center justify-center">
                      <p className="text-4xl">
                        Hủy đơn này?
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={modalClose}>
                      Không
                    </Button>
                    <Button color="success" onPress={handleCancelOrder}>
                      Có
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal size="4xl" isOpen={viewDetail} onClose={() => modalClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Chi tiết
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-row justify-center">
                      <div className="w-4/5">
                        <p className="w-full p-2 text-xl font-bold">Người mua: {account?.email}</p>
                        <Table aria-label="Orders Table">
                          <TableHeader>
                            <TableColumn className="text-2xl">Mã áo</TableColumn>
                            <TableColumn className="text-2xl">Kích thước</TableColumn>
                            <TableColumn className="text-2xl">Số lượng</TableColumn>
                            <TableColumn className="text-2xl">Thành tiền</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {details.map((detail, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-xl">
                                  {detail.shirt.code}
                                </TableCell>
                                <TableCell className="text-xl">
                                  {detail.size}
                                </TableCell>
                                <TableCell className="text-xl">
                                  {detail.quantity}
                                </TableCell>
                                <TableCell className="text-xl">
                                  {detail.subtotal}
                                </TableCell>
                              </TableRow>))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onPress={modalClose}>
                      Đóng
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default OrdersSection;