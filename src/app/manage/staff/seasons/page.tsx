"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon"
import { Button, Chip, DatePicker, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import { faEdit, faRemove, faEye, faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon } from "@/components/icons/searchicon";
import { addNewSeason, fetchAllSeasons, removeSeason, updateSeason } from "@/app/service/season_service";
import { fetchAllClubsFilter } from "@/app/service/club_service";
import Swal from 'sweetalert2';

const SeasonsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
  const [clubs, setClubs] = useState<PagedClub[]>([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [clubId, setClubId] = useState("");
  const [err, setErr] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchSeasons();
  }, [])
  useEffect(() => {
    fetchSeasons();
  }, [search, page])

  const fetchSeasons = async () => {
    try {
      const response = await fetchAllSeasons(page, search);
      setSeasons(response.items);
      setTotalPage(response["total-pages"])
      const resp = await fetchAllClubsFilter();
      setClubs(resp);
    } catch (error) {
      console.error("Error fetching seasons", error);
    }
  }

  const modalEditOpen = (season: SeasonModel) => {
    setSelectedSeason(season.id);
    setIsOpen(true);
    setIsEdit(true);
    setCode(season.code);
    setName(season.name);
    setClubId(String(season["club-id"]));
    setStatus(season.status);
  }

  const modalClose = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedSeason(0);
    setCode("");
    setName("");
    setClubId("");
    setStatus("");
    setErr("");
  }

  const handleAddSeason = async () => {
    try {
      if (code == "") {
        setErr("Hãy nhập Mã mùa giải");
      } else
        if (code.length > 6 || code.substring(0, 3) != "SES") {
          setErr("Mã mùa giải có dạng 'SES***'");
        } else
          if (name == "") {
            setErr("Hãy nhập Tên mùa giải");
          } else
            if (clubId == "") {
              setErr("Hãy chọn một Câu lạc bộ");
            } else {
              await addNewSeason(code, name, Number(clubId));
              modalClose();
              await Swal.fire({
                title: 'Thêm mùa giải thành công!',
                icon: 'success'
              });
              fetchSeasons();
            }

    } catch (error) {
      console.error("Error add new season", error);
    }
  }

  const handleEditSeason = async () => {
    try {
      if (code == "") {
        setErr("Hãy nhập Mã mùa giải");
      } else
        if (code.length > 6 || code.substring(0, 3) != "SES") {
          setErr("Mã mùa giải có dạng 'SES***'");
        } else
          if (name == "") {
            setErr("Hãy nhập Tên mùa giải");
          } else
            if (clubId == "") {
              setErr("Hãy chọn một Câu lạc bộ");
            } else {
              await updateSeason(selectedSeason, code, name, Number(clubId), status);
              modalClose();
              await Swal.fire({
                title: 'Chỉnh sửa mùa giải thành công!',
                icon: 'success'
              });
              fetchSeasons();
            }

    } catch (error) {
      console.error("Error update season", error);
    }
  }

  const handleRemoveSeason = async () => {
    try {
      await removeSeason(selectedSeason);
      setIsConfirm(false);
      setSelectedSeason(0);
      await Swal.fire({
        title: 'Xóa mùa giải thành công!',
        icon: 'success'
      });
      fetchSeasons();
    } catch (error) {
      console.error("Error remove season", error);
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
            icon={faSoccerBall}
            className="text-black-500"
          />
          <span>Mùa giải</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Danh sách</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả Mùa giải</h3>
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
            <Button onClick={() => setIsOpen(true)} color='primary'>Thêm mùa giải</Button>

            <Modal isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                setIsEdit(false);
              }} placement='top-center' size="3xl">
              <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>
                  {isEdit ? "Sửa thông tin" : "Thêm mùa giải"}
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row justify-center">
                    <div className="w-3/5">
                      <Input label='Mã mùa giải' variant='bordered' className="w-full p-2" value={code} onChange={(e) => setCode(e.target.value)} />
                      <Input label='Tên mùa giải' variant='bordered' className="w-full p-2" value={name} onChange={(e) => setName(e.target.value)} />
                      <Select
                        label="CLB"
                        className="w-full p-2"
                        defaultSelectedKeys={[clubId]}
                        onChange={(e) => setClubId(e.target.value)}
                      >
                        {clubs.map((club) => (
                          <SelectItem key={String(club.id)}>{club.name}</SelectItem>
                        ))}
                      </Select>
                      {isEdit && (
                        <Select
                          label="Status"
                          className="w-full p-2"
                          defaultSelectedKeys={[status]}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <SelectItem key={"Active"}>Active</SelectItem>
                          <SelectItem key={"Deleted"}>Deleted</SelectItem>
                        </Select>
                      )}
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
                  <Button color="primary" onPress={isEdit ? handleEditSeason : handleAddSeason}>
                    {isEdit ? "Lưu" : "Thêm"}
                  </Button>
                </ModalFooter>
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
              <TableColumn className="text-2xl">Mã mùa giải</TableColumn>
              <TableColumn className="text-2xl">Tên mùa giải</TableColumn>
              <TableColumn className="text-2xl">Câu lạc bộ</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
              <TableColumn className="text-2xl text-center">...</TableColumn>
            </TableHeader>
            {seasons.length == 0 ? (
              <TableBody emptyContent={"No data to display."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {seasons.map((season, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-2xl">
                      {season.code}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {season.name}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {clubs.filter(club => club.id == season["club-id"])[0]?.name}
                    </TableCell>
                    <TableCell className="text-2xl">
                      <Chip
                        size="md"
                        variant="flat"
                        color={
                          season.status === "Active"
                            ? "success"
                            : season.status === "Deleted"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {season.status}
                      </Chip>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Button
                        className="w-1/6 bg-yellow-500 text-white"
                        aria-label="edit"
                        onClick={() => modalEditOpen(season)}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-white-500"
                        />
                      </Button>
                      {season.status == "Active" && (
                        <Button
                          className="w-1/6 bg-red-500 text-white"
                          aria-label="remove"
                          onClick={() => { setIsConfirm(true); setSelectedSeason(season.id) }}
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

          <Modal size="2xl" isOpen={isConfirm} onClose={() => { setIsConfirm(false); setSelectedSeason(0) }}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Xác nhận
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-full flex items-center justify-center">
                      <p className="text-4xl">
                        Xóa mùa này ?
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Không
                    </Button>
                    <Button color="success" onPress={handleRemoveSeason}>
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

export default SeasonsSection;