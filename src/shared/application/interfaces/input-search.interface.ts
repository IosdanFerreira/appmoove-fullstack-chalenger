export type SortDirection = 'asc' | 'desc';

export interface InputSearchInterface<Search = string> {
  page: number;
  perPage: number;
  sort: string | null;
  sortDirection: SortDirection | null;
  search?: Search | null;
}
