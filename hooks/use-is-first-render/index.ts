import { useRef } from 'react';

export const useIsFirstRender = () => {
  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false;

    return true;
  }

  return isFirstRenderRef.current;
};
