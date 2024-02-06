export const splitArray = <T>(
  list: ReadonlyArray<T>,
  size: number
): ReadonlyArray<ReadonlyArray<T>> => [
  list.slice(0, size),
  ...(list.length > size ? splitArray(list.slice(size), size) : []),
];

export const chunk = <T = unknown>(
  list: ReadonlyArray<T>,
  length: number
): ReadonlyArray<ReadonlyArray<T>> => [
  list.slice(0, length),
  ...(list.length > length ? chunk(list.slice(length), length) : []),
];
