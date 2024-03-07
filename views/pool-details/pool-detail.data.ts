import { PoolDetailsCollapseData } from './accordion/accordion.type';

export const POOL_INFORMATION_DATA: PoolDetailsCollapseData = {
  title: 'POOL INFORMATION',
  data: [
    {
      label: 'Address',
      info: '0xcf994611fh334jnsdojiuhdjnjsdhkn344',
      clipBoard: true,
    },
    {
      label: 'Pool Type',
      info: 1.4,
    },
    {
      label: 'Algorithm',
      info: 'Stable',
    },
  ],
};

export const POOL_STATISTICS_DATA: PoolDetailsCollapseData = {
  title: 'STATISTICS',
  data: [
    {
      label: 'Liquidity',
      info: '$1,317,690',
    },
    {
      label: 'Volume (24h)',
      info: '$602.59k',
    },
    {
      label: 'Transactions (24h)',
      info: '121',
    },
    {
      label: 'Virtual Price',
      info: '1.00473694',
      additionalInfo: true,
    },
  ],
};
