export interface ListResponse<T> {
    data: T[];
    count: number;
}

export interface Pagination {
    offset: number;
    limit?: number;
}