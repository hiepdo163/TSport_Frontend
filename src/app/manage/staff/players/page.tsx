"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon"
import { RenderCell } from "@/components/table/render-cell"
import { Button, Chip, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import { faEdit, faRemove, faEye, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon } from "@/components/icons/searchicon";
import { addNewPlayer, fetchAllPlayers, updatePlayer } from "@/app/service/player_service";
import { fetchAllClubsFilter } from "@/app/service/club_service";
import Swal from "sweetalert2";

const PlayersSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedClubId, setSelectedClubId] = useState("");
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [clubs, setClubs] = useState<PagedClub[]>([]);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [clubId, setClubId] = useState("");
  const [status, setStatus] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, [])

  useEffect(() => {
    fetchPlayers();
  }, [page, search, selectedClubId])

  const fetchPlayers = async () => {
    try {
      const response = await fetchAllPlayers(page, search, selectedClubId);
      setPlayers(response.items);
      setTotalPage(response["total-pages"])
      const resp = await fetchAllClubsFilter();
      setClubs(resp);
    } catch (error) {
      console.error("Error fetching players", error);
    }
  }

  const modalEditOpen = (player: PlayerModel) => {
    setSelectedPlayer(player.id);
    setIsOpen(true);
    setIsEdit(true);
    setCode(player.code);
    setName(player.name);
    setClubId(String(player["club-id"]));
    setStatus(player.status);
  }

  const modalClose = () => {
    setSelectedPlayer(0);
    setIsOpen(false);
    setIsEdit(false);
    setCode("");
    setName("");
    setClubId("");
    setStatus("");
    setErr("");
  }

  const handleAddPlayer = async () => {
    try {
      if (code == "") {
        setErr("Hãy nhập Mã cầu thủ");
      } else
        if (code.length > 6 || code.substring(0, 3) != "PLY") {
          setErr("Mã cầu thủ có dạng 'PLY***'");
        } else
          if (name == "") {
            setErr("Hãy nhập Tên cầu thủ");
          } else
            if (clubId == "") {
              setErr("Hãy chọn một Câu lạc bộ");
            } else {
              await addNewPlayer(code, name, Number(clubId));
              modalClose();
              await Swal.fire({
                title: 'Thêm cầu thủ thành công!',
                icon: 'success'
              });
              fetchPlayers();
            }

    } catch (error) {
      console.error("Error add new player", error);
    }
  }

  const handleUpdatePlayer = async () => {
    try {
      if (code == "") {
        setErr("Hãy nhập Mã cầu thủ");
      } else
        if (code.length > 6 || code.substring(0, 3) != "PLY") {
          setErr("Mã cầu thủ có dạng 'PLY***'");
        } else
          if (name == "") {
            setErr("Hãy nhập Tên cầu thủ");
          } else
            if (clubId == "") {
              setErr("Hãy chọn một Câu lạc bộ");
            } else {
              await updatePlayer(selectedPlayer, code, name, Number(clubId), status);
              modalClose();
              await Swal.fire({
                title: 'Chỉnh sửa cầu thủ thành công!',
                icon: 'success'
              });
              fetchPlayers();
            }

    } catch (error) {
      console.error("Error update player", error);
    }
  }

  return (
    <div className="my-8 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
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
            icon={faPersonRunning}
            className="text-black-500"
          />
          <span>Cầu thủ</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Danh sách</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả Cầu thủ</h3>
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
          <Select
            label="CLB"
            placeholder="Chọn CLB"
            className="w-full p-4"
            defaultSelectedKeys={[selectedClubId]}
            onChange={(e) => setSelectedClubId(e.target.value)}
          >
            {clubs.map((club) => (
              <SelectItem key={String(club.id)}>{club.name}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <div>
            <Button onClick={() => setIsOpen(true)} color='primary'>Thêm cầu thủ</Button>

            <Modal isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                setIsEdit(false);
              }} placement='top-center' size="4xl">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {isEdit ? "Sửa thông tin" : "Thêm cầu thủ"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-row justify-center">
                        <div className="w-3/5">
                          <Input label='Mã cầu thủ' variant='bordered' className="w-full p-2" value={code} onChange={(e) => setCode(e.target.value)} />
                          <Input label='Tên cầu thủ' variant='bordered' className="w-full p-2" value={name} onChange={(e) => setName(e.target.value)} />
                          <Select
                            label="CLB"
                            placeholder="Chọn CLB"
                            className="w-full p-4"
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
                              className="w-full p-4"
                              defaultSelectedKeys={[status]}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <SelectItem key={"Active"}>Active</SelectItem>
                              <SelectItem key={"Deleted"}>Unactive</SelectItem>
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
                      <Button color="primary" onClick={isEdit ? handleUpdatePlayer : handleAddPlayer}>
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
              <TableColumn className="text-2xl">Mã cầu thủ</TableColumn>
              <TableColumn className="text-2xl">Tên</TableColumn>
              <TableColumn className="text-2xl">Câu lạc bộ</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
              <TableColumn className="text-2xl">...</TableColumn>
            </TableHeader>
            {players.length == 0 ? (
              <TableBody emptyContent={"No data to display."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-2xl">
                      {player.code}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {player.name}
                    </TableCell>
                    <TableCell className="text-2xl">
                      {clubs.filter(club => club.id == player["club-id"])[0]?.name}
                      {/* {player["club-id"]} */}
                    </TableCell>
                    <TableCell className="text-2xl">
                      <Chip
                        size="md"
                        variant="flat"
                        color={
                          player.status === "Active"
                            ? "success"
                            : player.status === "Deleted"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {player.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Button
                        className="w-1/6 bg-yellow-500 text-white"
                        aria-label="edit"
                        onClick={() => modalEditOpen(player)}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-white-500"
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <Pagination showControls total={totalPage} initialPage={1} onChange={(newPage) => setPage(newPage)} />
        </div>
      </div>
    </div>
  )
}

export default PlayersSection;