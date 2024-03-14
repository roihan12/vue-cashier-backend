export type Paging = {
  totalDocs: number;
  limit: number;
  page: number | undefined;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null | undefined;
  hasPrevPage: boolean;
  prevPage: number | null | undefined;
  pagingCounter: number;
};

export type Pageable<T> = {
  status: boolean;
  message: string;
  data: Array<T>;
  paging: Paging;
};
