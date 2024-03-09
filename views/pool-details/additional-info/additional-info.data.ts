import { BTCSVG, EthCircleSVG, USDTSVG } from '@/svg';

import { PoolDetailAccordionData } from './components/accordion/accordion.type';

export const POOL_INFORMATION: PoolDetailAccordionData = {
  title: 'POOL INFORMATION',
  data: [
    {
      label: 'Address',
      content: '0xcf994611fh334jnsdojiuhdjnjsdhkn344',
      isCopyClipBoard: true,
    },
    {
      label: 'Pool Type',
      content: 1.4,
    },
    {
      label: 'Algorithm',
      content: 'Stable',
    },
  ],
};

export const POOL_STATISTICS: PoolDetailAccordionData = {
  title: 'STATISTICS',
  data: [
    {
      label: 'Liquidity',
      content: '$1,317,690',
    },
    {
      label: 'Volume (24h)',
      content: '$602.59k',
    },
    {
      label: 'Transactions (24h)',
      content: '121',
    },
    {
      label: 'Virtual Price',
      content: '1.00473694',
      popupInfo: 'sddsds',
    },
  ],
};

export const POOL_COMPOSITION: PoolDetailAccordionData = {
  title: 'Pool Composition',
  data: [
    {
      Icon: USDTSVG,
      coinName: 'USDT',
      percentage: '33.7%',
      conversion: '$0.9 USD',
      value: '15,572,738.84035',
    },
    {
      Icon: BTCSVG,
      coinName: 'BTC',
      value: '298.83389',
      percentage: '33.5%',
      conversion: '$52,000 USD',
    },
    {
      Icon: EthCircleSVG,
      coinName: 'ETH',
      percentage: '33.1%',
      value: '5,276.31167',
      conversion: '$2,900 USD',
    },
  ],
  total: 'USD 54,900',
};

export const POOL_PARAMETERS: PoolDetailAccordionData = {
  title: 'PARAMETERS',
  data: [
    {
      label: 'Mid Fee',
      content: '0.01',
    },
    {
      label: 'Out Fee',
      content: '1.4',
    },
    {
      label: 'A',
      popupInfo: 'A',
      content: '540000',
    },
    {
      label: 'Gamma',
      content: '0.0000805',
    },
    {
      label: 'Allowed Extra Profit',
      content: '0.0000000001',
    },
    {
      label: 'Fee Gamma',
      content: '0.0004',
    },
    {
      label: 'Adjustment Step',
      content: '0.0000001',
    },
    {
      label: 'Moving Average Time',
      content: '601',
    },
  ],
};

export const POOL_PRICE: PoolDetailAccordionData = {
  title: 'PRICE',
  data: [
    {
      Icon: USDTSVG,
      coinName: 'USDT',
      value: '2,914.75',
    },
    {
      Icon: BTCSVG,
      coinName: 'BTC',
      value: '51,420.9',
    },
    {
      Icon: EthCircleSVG,
      coinName: 'ETH',
      value: '2,821.2',
    },
  ],
};

export const POOL_ORACLE_PRICE: PoolDetailAccordionData = {
  title: 'ORACLE PRICE',
  data: [
    {
      Icon: USDTSVG,
      coinName: 'USDT',
      value: '2,914.75',
    },
    {
      Icon: BTCSVG,
      coinName: 'BTC',
      value: '51,916.4',
    },
    {
      Icon: EthCircleSVG,
      coinName: 'ETH',
      value: '2,914.7',
    },
  ],
};
