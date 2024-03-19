export const updateURL = (url: string) =>
  window.history.pushState(undefined, '', url);
