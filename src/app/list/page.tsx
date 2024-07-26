import "./shirtlist.css";
import { Checkbox, checkboxGroup, Button, Card, CardBody, CardFooter, CheckboxGroup, Input, Pagination, Link } from "@nextui-org/react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortSelect from "../../components/shirts/sortSelect";
import { fetchPagedShirts } from "../service/shirt_service";
import ShirtCard from "@/components/shirts/shirtCard";
import { fetchAllClubsFilter } from "../service/club_service";
import ClubFilterContent from "./clubFilterContent";
import PriceFilterContent from "./priceFilterContent";
import { fetchAllSeasonsFilter } from "../service/season_service";
import { fetchAllPlayersFilter } from "../service/player_service";
import PlayerFilterContent from "./playerFilterContent";
import SeasonFilterContent from "./seasonFilterContent";
import Footer from "@/components/footer/footer";
import MainNavBar from "@/components/MainNavBar";
import { signout } from "../signin/actions";
import CustomPaginationBar from "@/components/CustomPaginationBar";

type Props = {
  searchParams: {
    page?: string;
    clubIds?: string;
    playerIds?: string;
    seasonIds?: string;
    sortColumn?: string;
    orderByDesc?: string;
    startPrice?: string;
    endPrice?: string;
  };
};


const ListShirt = async ({ searchParams }: Props) => {

  const clubIds = searchParams.clubIds?.split(',').map(id => +id) || [];
  const playerIds = searchParams.playerIds?.split(',').map(id => +id) || [];
  const seasonIds = searchParams.seasonIds?.split(',').map(id => +id) || [];
  const startPrice = searchParams.startPrice ? +searchParams.startPrice : null;
  const endPrice = searchParams.endPrice ? +searchParams.endPrice : null;

  const pagedResult: PagedResult<PagedShirt> = await fetchPagedShirts(
    {
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: 10,
      clubIds: clubIds,
      playerIds: playerIds,
      seasonIds: seasonIds,
      startPrice: startPrice,
      endPrice: endPrice,
      sortColumn: searchParams.sortColumn || 'id',
      orderByDesc: searchParams.orderByDesc === 'true',
    }
  );

  const clubs: ClubFilter[] = await fetchAllClubsFilter();

  const players: PlayerFilter[] = await fetchAllPlayersFilter();

  const seasons: SeasonFilter[] = await fetchAllSeasonsFilter();

  const shirts = pagedResult.items;

  // console.log({ pagedResult });

  return (
    <>
      {/* <Header/> */}
      <MainNavBar signout={signout} />
      <div className="main-container">
        <div className="container-fluid-home mt-10" style={{ minHeight: "700px" }}>
          <div className="" style={{ width: "20%", paddingInline: "15px" }}>
            <h1 className="text-2xl font-bold mb-3">
              <FilterAltIcon className="text-2xl" /> Bộ lọc
            </h1>

            <ClubFilterContent clubIds={clubIds} clubs={clubs} />
            <PlayerFilterContent players={players} playerIds={playerIds} />
            <SeasonFilterContent seasons={seasons} seasonIds={seasonIds} />
            <PriceFilterContent initialStartPrice={startPrice ? +startPrice : 0}
              initialEndPrice={endPrice ? +endPrice : 0} />
            <br />
            <div className="">
              <Link href={'/list'} color="primary" className="mt-1">Xóa bộ lọc</Link>
            </div>
          </div>
          <div style={{ width: "80%", display: "flex", justifyContent: "left", alignItems: "start", flexWrap: "wrap" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "end", paddingRight: "5%", marginBottom: "10px" }}>
              <SortSelect initialSortColumn={searchParams.sortColumn || 'id'}
                initialOrderByDesc={searchParams.orderByDesc === 'true'} />
            </div>

            {
              shirts.length === 0 ? (<div className="text-center w-full">Không tìm thấy sản phẩm nào.</div>) :
                (<div className="gap-4 grid sm:grid-cols-4 w-full">
                  {shirts.map((item, index) => (
                    <ShirtCard index={index} item={item} key={index} />
                  ))}
                </div>
                )}
            <div style={{ width: "100%", display: "flex", justifyContent: "end", paddingRight: "5%", margin: "30px 0" }}>
              {/* <PaginationBar totalPages={pagedResult["total-pages"]}/> */}
              {shirts.length > 0 && (
                // <Pagination color="danger" page={searchParams.page ? +searchParams.page : 1} showControls total={pagedResult["total-pages"]} initialPage={1} />
                <CustomPaginationBar page={searchParams.page ? +searchParams.page : 1} totalPages={pagedResult["total-pages"]} />
              )}
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
      <Footer />
    </>
  )
}

export default ListShirt;