import { createContext, useContext } from 'react';

import type { PoolDetailsContext } from './pool-details.types';

const poolDetailsContext = createContext<PoolDetailsContext>(
  {} as PoolDetailsContext
);

export const PoolDetailsProvider = poolDetailsContext.Provider;

export const usePoolDetails = () => useContext(poolDetailsContext);

export default poolDetailsContext;
