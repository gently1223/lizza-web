import { orderBy } from 'lodash';
export default <T>() => {
  const sortList = (
    list: T[] | undefined,
    key: string,
    order: 'asc' | 'desc' = 'desc'
  ): T[] =>
    !!list ? orderBy(list, key, order) : [];
  return { sortList };
};
