"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon"
import { RenderCell } from "@/components/table/render-cell"
import { Button, Chip, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import { faEdit, faRemove, faEye, faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon } from "@/components/icons/searchicon";
import { fetchPagedShirts, fetchShirtDetails, fetchShirts, removeShirt } from "@/app/service/shirt_service";
import SaveButton from "./SaveButton";
import { addSeasonPlayer, fetchSeasonPlayers } from "@/app/service/seasonplayer_service";
import { fetchShirtEditions } from "@/app/service/edition_service";
import Swal from "sweetalert2";
import { fetchAllSeasons } from "@/app/service/season_service";
import { fetchAllClubsFilter } from "@/app/service/club_service";
import { fetchAllPlayersFilter } from "@/app/service/player_service";

const ShirtsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [pagedResult, setpagedResult] = useState<PagedResult<PagedShirt>>();
  const [currentShirtId, setCurrentShirtId] = useState<number | undefined>();
  const [currentShirt, setCurrentShirt] = useState<ShirtDetails>();
  const [seasonPlayers, setSeasonPlayers] = useState<SeasonPlayerDetails[]>([]);
  const [shirtEditions, setShirtEditions] = useState<ShirtEdition[]>([]);
  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
  const [clubs,setClubs] = useState<ClubFilter[]>([]);
  const [players, setPlayers] = useState<PlayerFilter[]>([]);
  const [next, setNext] = useState(false);
  const [seasonId, setSeasonId] = useState("");
  const [playerId, setPlayerId] = useState("");

  const [createImageSrc, setCreateImageSrc] = useState("https://nextui-docs-v2.vercel.app/images/album-cover.png");
  const handleCreateImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Use a type assertion to tell TypeScript that reader.result will be a string
        setCreateImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCreateImageSrc("https://nextui-docs-v2.vercel.app/images/album-cover.png"); // Reset to default or placeholder if not an image
    }
  };

  useEffect(() => {

    fetchSeasonPlayers().then(data => {
      setSeasonPlayers(data);
    });

    fetchShirtEditions().then(data => {
      setShirtEditions(data);
    });

    getAllSeason();

    const timer = setTimeout(() => {
      fetchShirts(page, 4, keyword).then(data => {
        setpagedResult(data);
      });
    }, 400);

    return () => {
      clearTimeout(timer);
    }
  }, [page, keyword]);

  useEffect(() => {

    if (currentShirtId) {
      fetchShirtDetails(currentShirtId ?? 0).then(data => {
        setCurrentShirt(data);
      });
    }


    return () => {

    }
  }, [currentShirtId]);

  const getAllSeason = async () => {
    try {
      const response = await fetchAllSeasons(page, "");
      setSeasons(response.items);
      const res = await fetchAllClubsFilter();
      setClubs(res);
      const resp = await fetchAllPlayersFilter();
      setPlayers(resp);
    } catch (error) {
      console.error("Error fetching seasons", error);
    }
  }

  const handleRemoveShirt = async () => {
    try {
      await removeShirt(currentShirtId);
      setIsConfirm(false);
      setCurrentShirtId(0);
      await Swal.fire({
        title: 'Xóa áo thành công!',
        icon: 'success'
      });
      fetchShirts(page, 4, keyword).then(data => {
        setpagedResult(data);
      });
    } catch (error) {
      console.error("Error remove season", error);
    }
  }

  const handleNext = async () => {
      seasonPlayers.filter(sp => sp["season-id"] == Number(seasonId) && sp["player-id"] == Number(playerId)).length == 0 &&
      await addSeasonPlayer(Number(seasonId), Number(playerId));
      setNext(true);
      fetchSeasonPlayers().then(data => {
      setSeasonPlayers(data);
    });
  }

  const modalClose = () => {
    setSeasonId("");
    setPlayerId("");
    setIsOpen(false);
    setNext(false);
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
          <span>Áo đấu</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Danh sách</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả áo đấu</h3>
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
            placeholder="Nhập tên áo đấu..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <div>
            <Button onClick={() => setIsOpen(true)} color='primary'>Thêm áo đấu</Button>

            <Modal isOpen={isOpen}
              onClose={modalClose} placement='top-center' size="4xl">
              <ModalContent>
                {(onClose) => (
                  next ? (<form id="create_shirt_form">
                    <ModalHeader className='flex flex-col gap-1'>
                      {isEdit ? "Sửa áo đấu" : "Thêm áo đấu"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-row">
                        <div className="w-2/5">
                          <Image
                            isBlurred
                            width={240}
                            src={createImageSrc}
                            alt="..."
                            className="m-5"
                          />
                          <Input
                            onChange={handleCreateImageChange}
                            type="file"
                            name="Images"
                            accept="image/*"
                          />
                        </div>
                        <div className="w-3/5">
                          <Input label='Mã áo' name="Code" variant='bordered' className="w-full p-2" required />
                          <Input label='Tên áo' name="Name" variant='bordered' className="w-full p-2" required />
                          <Textarea
                            label="Mô tả áo"
                            placeholder="Nhập mô tả"
                            className="w-full p-2"
                            name="Description"
                            required
                          />
                          <Input
                            label="Số lượng"
                            name="Quantity"
                            variant="bordered"
                            className="w-full p-2"
                            required
                          />
                          {/* <Input label='Mã phiên bản' type="number" name="ShirtEditionId" variant='bordered' className="w-full p-2" required/> */}
                          {/* <Input label='Mã bộ mùa giải và cầu thủ' type="number" name="SeasonPlayerId" variant='bordered' className="w-full p-2" /> */}

                          <Select label="Chọn phiên bản"
                            className="w-full p-2"
                            name="ShirtEditionId"
                            required>
                            {shirtEditions.map((shirtEdition) => (
                              <SelectItem key={shirtEdition.id}>
                                {`${shirtEdition.size} - ${shirtEdition.color}`}
                              </SelectItem>
                            ))}
                          </Select>

                          <Select
                            label="Chọn bộ mùa giải, cầu thủ, câu lạc bộ"
                            className="w-full p-2"
                            name="SeasonPlayerId"
                            required
                          >
                            {seasonPlayers.map((seasonPlayer) => (
                              <SelectItem key={seasonPlayer.id}>
                                {`${seasonPlayer.season.name} - ${seasonPlayer.player.name} - ${seasonPlayer.season.club?.name}`}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onClick={modalClose}>
                        Đóng
                      </Button>
                      <SaveButton isEdit={isEdit} onClose={onClose} />
                      {/* <Button color="primary" onPress={onClose}>
                        {isEdit ? "Lưu" : "Thêm"}
                      </Button> */}
                    </ModalFooter>
                  </form>) : (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {isEdit ? "Sửa áo đấu" : "Thêm áo đấu"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-row">
                        <div className="w-2/5">
                          <Select label="Chọn mùa giải - câu lạc bộ"
                            className="w-full p-2"
                            value={seasonId}
                            onChange={(e) => setSeasonId(e.target.value)}
                            required>
                            {seasons.map((season) => (
                              <SelectItem key={season.id.toString()}>
                                {`${season.name} - ${clubs.filter(club => club.id == season["club-id"])[0]?.name}`}
                              </SelectItem>
                            ))}
                          </Select>

                          <Select
                            label="Chọn cầu thủ"
                            className="w-full p-2"
                            value={playerId}
                            onChange={(e)=> setPlayerId(e.target.value)}
                            required
                          >
                            {players.map((player) => (
                              <SelectItem key={player.id}>
                                {player.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onClick={modalClose}>
                        Đóng
                      </Button>
                      <Button color="primary" onPress={handleNext}>
                        Next
                      </Button>
                    </ModalFooter>
                  </>)
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
              <TableColumn className="text-2xl">Mã</TableColumn>
              <TableColumn className="text-2xl">Tên áo</TableColumn>
              <TableColumn className="text-2xl">Mô tả</TableColumn>
              <TableColumn className="text-2xl">Số lượng</TableColumn>
              <TableColumn className="text-2xl">Trạng thái</TableColumn>
              <TableColumn className="text-2xl">...</TableColumn>
            </TableHeader>
            {!pagedResult || pagedResult?.items.length == 0 ? (
              <TableBody emptyContent={"Không có áo nào."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody>
                {pagedResult.items.map((shirt, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xl">
                      {shirt.code}
                    </TableCell>
                    <TableCell className="text-xl">
                      {shirt.name}
                    </TableCell>
                    <TableCell className="text-xl">
                      {shirt.description}
                    </TableCell>
                    <TableCell className="text-xl">
                      {shirt.quantity}
                    </TableCell>
                    <TableCell className="text-xl">
                      <Chip
                        size="md"
                        variant="flat"
                        color={
                          shirt.status === "Active"
                            ? "success"
                            : shirt.status === "Delected"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {shirt.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Button
                        className="w-1/6 text-black"
                        aria-label="detail"
                        onClick={() => {
                          setCurrentShirtId(shirt.id);
                          setViewDetail(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-white-500"
                        />
                      </Button>
                      {/* <Button
                        className="w-1/6 bg-yellow-500 text-white"
                        aria-label="edit"
                        onClick={() => {
                          setIsEdit(true);
                          setIsOpen(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-white-500"
                        />
                      </Button> */}
                      <Button
                        className="w-1/6 bg-red-500 text-white"
                        aria-label="remove"
                        onClick={() => {setIsConfirm(true); setCurrentShirtId(shirt.id)}}
                      >
                        <FontAwesomeIcon
                          icon={faRemove}
                          className="text-white-500"
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <Pagination onChange={(newPage) => setPage(newPage)} showControls total={pagedResult?.["total-pages"] ?? 1} initialPage={page} />

          <Modal size="2xl" isOpen={isConfirm} onClose={() => {setIsConfirm(false); setCurrentShirtId(0)}}>
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
                    <Button color="success" onPress={handleRemoveShirt}>
                      Có
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal size="4xl" isOpen={viewDetail} onClose={() => setViewDetail(false)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Chi tiết
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-row">
                      <div className="w-2/5 flex justify-center items-start">
                        <Image
                          isBlurred
                          width={240}
                          src={currentShirt?.images?.[0]?.url ?? "https://nextui-docs-v2.vercel.app/images/album-cover.png"}
                          alt="NextUI Album Cover"
                          className="m-5"
                        />
                      </div>
                      <div className="w-3/5">
                        <p className="w-full p-2">Mã sản phẩm: {currentShirt?.code}</p>
                        <p className="w-full p-2">Tên áo: {currentShirt?.name}</p>
                        <p className="w-full p-2">Mô tả: {currentShirt?.description}</p>
                        <p className="w-full p-2">Số lượng: {currentShirt?.quantity}</p>
                        <p className="w-full p-2">Phiên bản: {`${currentShirt?.["shirt-edition"].size} - ${currentShirt?.["shirt-edition"].color}`}</p>
                        <p className="w-full p-2">Cầu thủ: {`${currentShirt?.["season-player"].player.name}`}</p>
                        <p className="w-full p-2">Câu lạc bộ: {`${currentShirt?.["season-player"].season.club.name}`}</p>
                        <p className="w-full p-2">Mùa giải: {`${currentShirt?.["season-player"].season.name}`}</p>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onPress={onClose}>
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

export default ShirtsSection;