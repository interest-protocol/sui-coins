export const isFile = (item: DataTransferItem | File): item is File =>
  !(item as DataTransferItem).kind;
