// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop: any = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const asyncNoop = async () => {};

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
