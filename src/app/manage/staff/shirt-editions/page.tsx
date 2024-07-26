"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon"
import { Button, Checkbox, Chip, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, useScrollShadow } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import { faEdit, faRemove, faEye, faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon } from "@/components/icons/searchicon";
import { addEdition, fetchAllEditions, updateEdition } from "@/app/service/edition_service";
import { fetchAllSeasonsFilter } from "@/app/service/season_service";
import Swal from "sweetalert2";

const EditionsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] =useState("");
  const [editions, setEditions] = useState<ShirtEdition[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedEdition, setSelectedEdition] = useState(0);
  const [code, setCode] = useState("");
  const [size, setSize] = useState("");
  const [sign, setSign] = useState("false");
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [color, setColor] = useState("");
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [material, setMaterial] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [status, setStatus] = useState("");
  const [err, setErr] = useState("");

   useEffect(()=> {
    fetchShirts()
  },[])

  useEffect(()=> {
    fetchShirts()
  },[page, search])

  const fetchShirts = async () => {
      try {
        const response = await fetchAllEditions(page, search);
        setEditions(response.items);
        setTotalPage(response["total-pages"]);
        const resp = await fetchAllSeasonsFilter();
        setSeasons(resp)
      } catch (error) {
        console.error("Error fetching editions",error);
      }
  }

  const modalDetailOpen = (edition: EditionModel) => {
    setViewDetail(true);
    setCode(edition.code);
    setSize(edition.size);
    setSign(String(edition["has-signature"]));
    setStock(edition["stock-price"]);
    setDiscount(edition["discount-price"]);
    setColor(edition.color);
    setStatus(edition.status);
    setOrigin(edition.origin);
    setQuantity(edition.quantity);
    setMaterial(edition.material);
    setSeasonId(String(edition["season-id"]));
  }

  const modalEditOpen = (edition: EditionModel) => {
    setIsEdit(true);
    setIsOpen(true);
    setSelectedEdition(edition.id)
    setCode(edition.code);
    setSize(edition.size);
    setSign(String(edition["has-signature"]));
    setStock(edition["stock-price"]);
    setDiscount(edition["discount-price"]);
    setColor(edition.color);
    setStatus(edition.status);
    setOrigin(edition.origin);
    setQuantity(edition.quantity);
    setMaterial(edition.material);
    setSeasonId(String(edition["season-id"]));
  }

  const modalClose = () => {
    setIsEdit(false);
    setIsOpen(false);
    setViewDetail(false);
    setCode("");
    setSize("");
    setSign("false");
    setStock(0);
    setDiscount(0);
    setColor("");
    setStatus("");
    setOrigin("");
    setQuantity(0);
    setMaterial("");
    setSeasonId("");
    setErr("");
  }
  
  const handleAddEdition = async () => {
    try {
      if (code == ""){
        setErr("Hãy nhập Mã sản phẩm");
      } else
      if (code.length > 5 || code.substring(0,2) != "SE"){
        setErr("Mã sản phẩm có dạng SE***");
      } else
      if (size == ""){
        setErr("Hãy nhập Kích thước");
      } else
      if (stock <= 0){
        setErr("Giá gốc phải lớn hơn 0");
      } else
      if (discount <= 0){
        setErr("Giá triết khấu phải lớn hơn 0");
      } else
      if (stock < discount){
        setErr("Giá gốc phải lớn Giá triết khấu");
      } else
      if (color == ""){
        setErr("Hãy nhập Màu sắc");
      } else
      if (origin == ""){
        setErr("Hãy nhập Xuất xứ");
      } else
      if (quantity <= 0){
        setErr("Số lượng phải lớn hơn 0");
      } else
      if (material == ""){
        setErr("Hãy nhập Chất liệu");
      } else
      if (seasonId == ""){
        setErr("Hãy chọn Mùa giải");
      } else {
        await addEdition(code, size, sign == "true", stock, discount, color, origin, quantity, material, Number(seasonId));
        modalClose();
        await Swal.fire({
                title: 'Thêm mãu thành công!',
                icon: 'success'
            });
            fetchShirts();
      }
        
      } catch (error) {
        console.error("Error add new edition",error);
      }
  }

  const handleUpdateEdition = async () => {
    try {
      if (code == ""){
        setErr("Hãy nhập Mã sản phẩm");
      } else
      if (code.length > 5 || code.substring(0,2) != "SE"){
        setErr("Mã sản phẩm có dạng SE***");
      } else
      if (size == ""){
        setErr("Hãy nhập Kích thước");
      } else
      if (stock <= 0){
        setErr("Giá gốc phải lớn hơn 0");
      } else
      if (discount <= 0){
        setErr("Giá triết khấu phải lớn hơn 0");
      } else
      if (stock < discount){
        setErr("Giá gốc phải lớn Giá triết khấu");
      } else
      if (color == ""){
        setErr("Hãy nhập Màu sắc");
      } else
      if (origin == ""){
        setErr("Hãy nhập Xuất xứ");
      } else
      if (quantity <= 0){
        setErr("Số lượng phải lớn hơn 0");
      } else
      if (material == ""){
        setErr("Hãy nhập Chất liệu");
      } else
      if (seasonId == ""){
        setErr("Hãy chọn Mùa giải");
      } else {
        await updateEdition(selectedEdition, code, size, sign == "true", stock, discount, color, origin, quantity, material, Number(seasonId));
        modalClose();
        await Swal.fire({
                title: 'Sửa mãu thành công!',
                icon: 'success'
            });
            fetchShirts();
      }
        
      } catch (error) {
        console.error("Error update edition",error);
      }
  }

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
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
            icon={faTShirt}
            className="text-white-500"
          />
          <span>Phiên bản</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Danh sách</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả phiên bản</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <div>
            <Button onClick={() => setIsOpen(true)} color='primary'>Thêm áo đấu</Button>

            <Modal isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                setIsEdit(false);
              }} placement='top-center' size="4xl">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {isEdit ? "Sửa áo đấu" : "Thêm áo đấu"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-row justify-center">
                        <div className="w-3/5">
                          <Input label='Mã sản phẩm' variant='bordered' className="w-full p-2" value={code} onChange={(e) => setCode(e.target.value)}/>
                          {/* <Checkbox checked={sign} onChange={(e) => setSign(e.target.checked)}>Có chữ ký</Checkbox> */}
                          <Select
                            label="Chữ ký"
                            className="w-full p-2"
                            defaultSelectedKeys={[sign]}
                            onChange={(e) => setSign(e.target.value)}
                          >
                              <SelectItem key={"false"}>Không chữ ký</SelectItem>
                              <SelectItem key={"true"}>Có chữ ký</SelectItem>
                          </Select>
                          <Input label='Kích thước' variant='bordered' className="w-full p-2" value={size} onChange={(e) => setSize(e.target.value)}/>
                          <Input
                            label="Giá gốc"
                            variant="bordered"
                            type="number"
                            className="w-full p-2"
                            value={stock.toString()}
                            onChange={(e) => setStock(parseInt(e.target.value))}
                          />
                          <Input
                            label="Giá triết khấu"
                            variant="bordered"
                            type="number"
                            className="w-full p-2"
                            value={discount.toString()}
                            onChange={(e) => setDiscount(parseInt(e.target.value))}
                          />
                          <Input label='Màu sắc' variant='bordered' className="w-full p-2" value={color} onChange={(e) => setColor(e.target.value)}/>
                          <Input label='Xuất xứ' variant='bordered' className="w-full p-2" value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                          <Input
                            label="Số lượng"
                            variant="bordered"
                            type="number"
                            className="w-full p-2"
                            value={quantity.toString()}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                          />
                          <Input label='Chất liệu' variant='bordered' className="w-full p-2" value={material} onChange={(e) => setMaterial(e.target.value)}/>
                          <Select
                            label="Mùa giải"
                            className="w-full p-2"
                            defaultSelectedKeys={[seasonId]}
                            onChange={(e) => setSeasonId(e.target.value)}
                          >
                            {seasons.map((season) => (
                              <SelectItem key={String(season.id)}>{season.name}</SelectItem>
                            ))}
                          </Select>
                          {err != "" && (
                            <p className="text-2xl text-red-700 font-bold">{err}</p>
                          )}
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onClick={modalClose}>
                        Đóng
                      </Button>
                      <Button color="primary" onClick={isEdit ?  handleUpdateEdition : handleAddEdition}>
                        {isEdit ? "Lưu" : "Thêm"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {/* <TableWrapper /> */}
        <div className=" w-full flex flex-col gap-4">
          <Table aria-label="Users Table">
            <TableHeader>
              <TableColumn className="text-2xl">Mã Sản phẩm</TableColumn>
              <TableColumn className="text-2xl">Số lượng</TableColumn>
              <TableColumn className="text-2xl">Giá gốc</TableColumn>
              <TableColumn className="text-2xl">Giá triết khấu</TableColumn>
              <TableColumn className="text-2xl">Nguồn gốc</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
              <TableColumn className="text-2xl">...</TableColumn>
            </TableHeader>
            {editions.length == 0 ? (
              <TableBody emptyContent={"No data to display."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {editions.map((shirt, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-2xl">
                      {shirt.code}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {shirt.quantity}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {shirt["stock-price"]}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {shirt["discount-price"]}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {shirt.origin}
                    </TableCell>
                    <TableCell className="text-2xl">
                      <Chip
                        size="md"
                        variant="flat"
                        color={
                          shirt.status === "Active"
                            ? "success"
                            : shirt.status === "Deleted"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {shirt.status}
                      </Chip>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Button
                        className="w-1/6 text-black"
                        aria-label="detail"
                        onClick={() => modalDetailOpen(shirt)}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-white-500"
                        />
                      </Button>
                      <Button
                        className="w-1/6 bg-yellow-500 text-white"
                        aria-label="edit"
                        onClick={() => modalEditOpen(shirt)}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-white-500"
                        />
                      </Button>
                      
                      {shirt.status == "Active" && (
                        <Button
                        className="w-1/6 bg-red-500 text-white"
                        aria-label="remove"
                        onClick={() => setIsConfirm(true)}
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

          <Modal size="2xl" isOpen={isConfirm} onClose={() => setIsConfirm(false)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Xác nhận
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-full flex items-center justify-center">
                      <p className="text-4xl">
                        Xóa mẫu áo đấu này ?
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Không
                    </Button>
                    <Button color="success" onPress={onClose}>
                      Có
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal size="3xl" isOpen={viewDetail} onClose={() => modalClose}>
            <ModalContent>
                  <ModalHeader className="flex flex-col gap-1">
                    Chi tiết
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-row justify-center">
                      <div className="w-1/4">
                        <p className="w-full p-2 font-bold">Mã sản phẩm:</p>
                        <p className="w-full p-2 font-bold">Có chữ ký:</p>
                        <p className="w-full p-2 font-bold">Kích thước:</p>
                        <p className="w-full p-2 font-bold">Giá gốc:</p>
                        <p className="w-full p-2 font-bold">Giá triết khấu:</p>
                        <p className="w-full p-2 font-bold">Màu sắc:</p>
                        <p className="w-full p-2 font-bold">Xuất xứ:</p>
                        <p className="w-full p-2 font-bold">Số lượng:</p>
                        <p className="w-full p-2 font-bold">Chất liệu:</p>
                        <p className="w-full p-2 font-bold">Mùa giải:</p>
                        <p className="w-full p-2 font-bold">Trạng thái</p>
                      </div>
                      <div className="w-1/4">
                        <p className="w-full p-2">{code}</p>
                        <p className="w-full p-2">{sign == "true" ? <Checkbox isDisabled defaultSelected></Checkbox> : <Checkbox isDisabled/>}</p>
                        <p className="w-full p-2">{size}</p>
                        <p className="w-full p-2">{stock}</p>
                        <p className="w-full p-2">{discount}</p>
                        <p className="w-full p-2">{color}</p>
                        <p className="w-full p-2">{origin}</p>
                        <p className="w-full p-2">{quantity}</p>
                        <p className="w-full p-2">{material}</p>
                        <p className="w-full p-2">{seasons.filter(season => String(season.id) === seasonId)[0]?.name}</p>
                        <p className="w-full p-2">{status}</p>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={modalClose}>
                      Đóng
                    </Button>
                  </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default EditionsSection;