/** @ignore */
export interface BaseResponse<TData> {
    status: string;

    data: TData;
}

/** Represents the options to sort a response. */
export interface ListSortOptions<SortByType> {
    /** How to sort the response. */
    sortBy: SortByType;
    /** Number of the page to retrieve. Minimum is 1. */
    page: number;
    /** Number of items per page. Must be between 1 and 100. */
    itemsOnPage: number;
    /** Sort by descending order. */
    isDescending?: boolean;
}
