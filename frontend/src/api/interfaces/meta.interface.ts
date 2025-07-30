import { Pagination } from "./pagination.interface";

export interface Meta {
  pagination: Pagination;
  sort: string;
  sortDirection: 'asc' | 'desc';
  search: string;
}