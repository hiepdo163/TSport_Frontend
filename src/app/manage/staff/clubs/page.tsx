"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon"
import { Button, Chip, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import { faEdit, faRemove, faEye, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon } from "@/components/icons/searchicon";
import { addNewClub, fetchAllClubs, removeClubs, updateClub } from "@/app/service/club_service";
import Swal from "sweetalert2";

const ClubsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState<PagedClub[]>([]);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [selectedClub, setSelectedClub] = useState(0);
  const [status, setStatus] = useState("Active");

useEffect(() => {
    fetchClubs();
  },[])
  useEffect(() => {
    fetchClubs();
  },[search, page])

  const fetchClubs = async () => {
      try {
        const response = await fetchAllClubs(page, search);
        setClubs(response.items);
        setTotalPage(response["total-pages"]);
      } catch (error) {
        console.error("Error fetching clubs",error);
      }
  }

  const modalClose = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedClub(0);
    setCode("");
    setName("");
    setStatus("Active");
    setErr("");
  }

  const handleCreateClub = async () => {
    try {
      if (code == "") {
        setErr("Hãy nhập Mã CLB");
      } else
        if (code.length > 6 || code.substring(0, 3) != "CLB") {
          setErr("Mã câu lạc bộ có dạng 'CLB***'");
        } else
          if (name == "") {
            setErr("Hãy nhập Tên câu lạc bộ");
          } else if (clubs.filter(club => club.code === code).length > 0) {
            setErr("Mã câu lạc bộ đã tồn tại");
          }else
        {
          await addNewClub(code, name, status);
        modalClose();
        await Swal.fire({
                title: 'Thêm clb thành công!',
                icon: 'success'
            });
            fetchClubs();
        }
      } catch (error) {
        console.error("Error create club",error);
      }
  }

  // const handleUpdateClub = async () => {
  //   try {
  //     if (code == "") {
  //       setErr("Hãy nhập Mã CLB");
  //     } else
  //       if (code.length > 6 || code.substring(0, 3) != "CLB") {
  //         setErr("Mã câu lạc bộ có dạng 'CLB***'");
  //       } else
  //         if (name == "") {
  //           setErr("Hãy nhập Tên câu lạc bộ");
  //         } else
  //       {
  //         await updateClub(selectedClub, code, name, status);
  //       modalClose();
  //       await Swal.fire({
  //               title: 'Sửa clb thành công!',
  //               icon: 'success'
  //           });
  //           fetchClubs();
  //       }
  //     } catch (error) {
  //       console.error("Error create club",error);
  //     }
  // }

  const handleRemoveClub = async () => {
    try {
        await removeClubs(selectedClub);
        setIsConfirm(false);
        setSelectedClub(0);
        await Swal.fire({
                title: 'Xóa clb thành công!',
                icon: 'success'
            });
            fetchClubs();
      } catch (error) {
        console.error("Error remove club",error);
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
            icon={faPeopleGroup}
            className="text-black-500"
          />
          <span>CLB</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Danh sách</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả Câu lạc bộ</h3>
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
            <Button onClick={() => setIsOpen(true)} color='primary'>Thêm CLB</Button>

            <Modal isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                setIsEdit(false);
                setErr("");
              }} placement='top-center' size="2xl">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {isEdit ? "Sửa thông tin" : "Thêm CLB"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-row justify-center">
                        {/* <div className="w-2/5">
                          <Image
                            isBlurred
                            width={240}
                            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                            alt="NextUI Album Cover"
                            className="m-5"
                          />
                          <Input
                            type="file"
                            accept="image/*"
                          />
                        </div> */}
                        <div className="w-3/5">
                          <Input label='Mã CLB' variant='bordered' className="w-full p-2" value={code} onChange={(e) => setCode(e.target.value)}/>
                          <Input label='Tên CLB' variant='bordered' className="w-full p-2" value={name} onChange={(e) => setName(e.target.value)}/>
                          <Select
                          label="Status"
                          className="w-full p-2"
                          defaultSelectedKeys={[status]}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <SelectItem key={"Active"}>Active</SelectItem>
                          <SelectItem key={"Unactive"}>Unactive</SelectItem>
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
                      <Button color="primary" onPress={handleCreateClub}>
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
              <TableColumn className="text-2xl">Mã CLB</TableColumn>
              <TableColumn className="text-2xl">Tên CLB</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
              <TableColumn className="text-2xl">...</TableColumn>
            </TableHeader>
            {clubs.length == 0 ? (
              <TableBody emptyContent={"No data to display."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {clubs.map((club, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-2xl">
                      {club.code}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {club.name}
                    </TableCell>
                    <TableCell className="text-2xl">
                      <Chip
                        size="md"
                        variant="flat"
                        color={
                          club.status === "Active"
                            ? "success"
                            : club.status === "Deleted"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {club.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      {/* <Button
                        className="w-1/6 bg-yellow-500 text-white"
                        aria-label="edit"
                        onClick={() => {
                          setIsEdit(true);
                          setIsOpen(true);
                          setSelectedClub(club.id);
                          setCode(club.code);
                          setName(club.name);
                          setStatus(club.status);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-white-500"
                        />
                      </Button> */}
                      {club.status == "Active" && (
                        <Button
                        className="w-1/6 bg-red-500 text-white"
                        aria-label="remove"
                        onClick={() => {setIsConfirm(true); setSelectedClub(club.id)}}
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
          <Pagination showControls total={totalPage} initialPage={1} onChange={(newPage) => setPage(newPage)}/>

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
                        Xóa CLB này ?
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Không
                    </Button>
                    <Button color="success" onPress={handleRemoveClub}>
                      Có
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

export default ClubsSection;