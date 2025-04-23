import { PAGE_LIMIT_DEFAULT, PAGE_OFFSET_DEFAULT } from '@/config';

export interface IPagination {
  limit: number;
  offset: number;
}

export const defaultPagination: IPagination = {
  limit: PAGE_LIMIT_DEFAULT,
  offset: PAGE_OFFSET_DEFAULT,
};
