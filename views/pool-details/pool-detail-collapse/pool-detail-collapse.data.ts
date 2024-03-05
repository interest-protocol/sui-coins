import { PoolDetailsCollapseData } from './pool-detail-collapse.type';

export const POOL_PARAMETERS_DATA: PoolDetailsCollapseData = {
  title: 'POOL PARAMETERS',
  data: [
    {
      label: 'Mid fee',
      info: 0.01,
    },
    {
      label: 'Out fee',
      info: 1.4,
    },
    {
      label: 'A',
      info: 540000,
      additionalInfo: true,
    },
    {
      label: 'Gamma',
      info: 0.0000805,
    },
    {
      label: 'Allowed Extra Profit',
      info: 0.0000000001,
    },
    {
      label: 'Fee Gamma',
      info: 0.0004,
    },
    {
      label: 'Adjustment Step',
      info: 0.0000001,
    },
    {
      label: 'Moving Average Time',
      info: 601,
    },
  ],
};
