type PagedResult<T> = {
    "total-count": number;
    "page-number": number;
    "page-size": number;
    "total-pages": number;
    items: T[];
};