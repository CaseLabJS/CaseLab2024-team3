import { SORTING_STATE } from '@constants/sorting';

function getObjKeyByValue<T extends Record<string, U>, U>(
  obj: T,
  value: U
): keyof T | undefined {
  return Object.keys(obj).find((key) => obj[key] === value);
}

export function prepareSortingState(sort: string) {
  const sortingKey = getObjKeyByValue(SORTING_STATE, sort);

  return sort && sort !== SORTING_STATE.without && sortingKey
    ? [
        {
          id: sortingKey.substring(
            0,
            sortingKey.length - (sortingKey.endsWith('Asc') ? 3 : 4)
          ),
          desc: sort.endsWith('DESC'),
        },
      ]
    : [];
}
