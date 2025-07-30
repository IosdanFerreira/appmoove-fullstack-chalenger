import { ApiProperty } from '@nestjs/swagger';
import { SortDirection } from 'src/shared/application/interfaces/input-search.interface';

export class PaginationPresenter {
  @ApiProperty({ description: 'Total de itens' })
  totalItems: number;

  @ApiProperty({ description: 'Página atual' })
  currentPage: number;

  @ApiProperty({ description: 'Itens por página' })
  perPage: number;

  @ApiProperty({ description: 'Total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Página anterior', nullable: true })
  prevPage: number | null;

  @ApiProperty({ description: 'Próxima página', nullable: true })
  nextPage: number | null;

  constructor(props: {
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
  }) {
    this.totalItems = props.totalItems;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.totalPages = props.totalPages;
    this.prevPage = props.prevPage;
    this.nextPage = props.nextPage;
  }
}

export class MetaPresenter<Search = string> {
  @ApiProperty({ type: PaginationPresenter })
  pagination: PaginationPresenter;

  @ApiProperty({ description: 'Campo de ordenação', nullable: true })
  sort: string | null;

  @ApiProperty({
    description: 'Direção da ordenação (asc/desc)',
    enumName: 'SortDirection',
  })
  sortDirection: SortDirection;

  @ApiProperty({ description: 'Filtro aplicado', nullable: true })
  search: Search | null;

  constructor(props: {
    pagination: PaginationPresenter;
    sort: string | null;
    sortDirection: SortDirection;
    search: Search | null;
  }) {
    this.pagination = props.pagination;
    this.sort = props.sort;
    this.sortDirection = props.sortDirection;
    this.search = props.search;
  }
}
