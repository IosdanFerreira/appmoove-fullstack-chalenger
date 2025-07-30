export interface Pagination {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}