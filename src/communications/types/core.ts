export interface PagedOptions {
    /** The beginning of the time range (in milliseconds that have elapsed since epoch). */
    from?: number;
    /** The end of the time range (in milliseconds that have elapsed since epoch). */
    to?: number;
    /** The maximum number of displayed results. We recommend setting the proper value of this parameter to shorten the response time. */
    max?: number;
    /** When the results span multiple pages, use this option to navigate through pages. By default, only the max number of results is displayed. To see the next results, set the start parameter to the value of the next key returned in the previous response. */
    start?: string;
}

export interface AllElementsOptions {
    /** The beginning of the time range (in milliseconds that have elapsed since epoch). */
    from?: number;
    /** The end of the time range (in milliseconds that have elapsed since epoch). */
    to?: number;
    /** The maximum number of elements to return per page. We recommend setting the proper value of this parameter to shorten the response time. */
    page_size?: number;
}

export interface PagedResponse {
    /**
     * The token representing the first page of displayed results.
     * Use this token as a value of the start parameter to return to the first page of the displayed results.
     */
    first?: string;
    /**
     * The token representing the next page of displayed results.
     * Use this token as a value of the start parameter to access the next page of results.
     */
    next?: string;
}
