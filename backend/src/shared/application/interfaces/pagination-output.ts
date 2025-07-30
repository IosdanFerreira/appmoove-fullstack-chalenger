import { MetaInterface } from './meta.interface';

export type PaginationOutputInterface<T> = {
  items: T[];
  meta: MetaInterface;
};
