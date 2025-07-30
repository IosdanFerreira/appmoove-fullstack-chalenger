import { PaginationInterface } from '../interfaces/pagination.interface';

export class PaginationUtil {
  static buildPagination(
    count: number,
    page: number,
    perPage: number,
  ): PaginationInterface {
    const totalPages = Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    return {
      currentPage: Number(page),
      perPage: Number(perPage),
      totalItems: count,
      totalPages,
      prevPage,
      nextPage,
    };
  }
}
