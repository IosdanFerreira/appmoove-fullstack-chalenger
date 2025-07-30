import { PaginationInterface } from '../../application/interfaces/pagination.interface';
import { SortDirection } from './input-search.interface';

export interface MetaInterface<Search = string> {
  pagination: PaginationInterface;
  sort: string | null;
  sortDirection: SortDirection;
  search: Search | null;
}
