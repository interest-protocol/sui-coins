export const splitArray = <T>(
  list: ReadonlyArray<T>,
  size: number
): ReadonlyArray<ReadonlyArray<T>> => [
  list.slice(0, size),
  ...(list.length > size ? splitArray(list.slice(size), size) : []),
];
