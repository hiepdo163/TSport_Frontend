type QueryPagedShirtRequest = {
    page: number;
    pageSize: number;
    clubIds: number[];
    seasonIds: number[];
    playerIds: number[];
    startPrice: number | null;
    endPrice: number | null;
    sortColumn: string;
    orderByDesc: boolean;
};