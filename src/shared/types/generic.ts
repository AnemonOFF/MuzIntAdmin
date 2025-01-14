export type Pagination<T> = {
  totalCount: number;
  perPageCount: number;
  items: T[];
};
