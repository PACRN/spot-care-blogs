import { PaginationProps } from "./Pagination";

type FilterProps = {
    careType: string;
    lat: number;
    lon: number;
    radius: string;
    pageSize: number;
    page: number;
    postalCode: string;
}

export type Filters = FilterProps;