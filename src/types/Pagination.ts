export type PaginationProps = {
    pageSize: number;
    page: number;
}

export type PaginationDetails = {
    total: number;
    currentPage: number;
    totalPages: number;
}

export interface PaginationResult<T> {
    data: T[];
    total: number;
}

export interface Filters {
    radius: string;
    lat: number;
    lon: number;
    careType: string;
    page: number;
    pageSize: number;
}