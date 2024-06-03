import { PoolDetailAccordionData } from './components/accordion/accordion.types';

export const POOL_INFORMATION: PoolDetailAccordionData = {
  title: 'POOL INFORMATION',
  data: [
    {
      label: 'Address',
      isCopyClipBoard: true,
    },
    {
      label: 'Pool Type',
    },
    {
      label: 'Algorithm',
    },
  ],
};

export const POOL_STATISTICS: PoolDetailAccordionData = {
  title: 'STATISTICS',
  data: [
    {
      label: 'Liquidity',
    },
    {
      label: 'Virtual Price',
      popupInfo: 'Total $USD in the pool / total number of Lp Coins',
    },
  ],
};

export const POOL_PARAMETERS: PoolDetailAccordionData = {
  title: 'PARAMETERS',
  data: [
    {
      label: 'Mid Fee',
    },
    {
      label: 'Out Fee',
    },
    {
      label: 'A',
      popupInfo: 'A',
    },
    {
      label: 'Gamma',
    },
    {
      label: 'Allowed Extra Profit',
    },
    {
      label: 'Fee Gamma',
    },
    {
      label: 'Adjustment Step',
    },
    {
      label: 'Moving Average Time',
    },
  ],
};
