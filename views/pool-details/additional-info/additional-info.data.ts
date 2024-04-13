import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { BTCSVG, EthCircleSVG, MOVSVG, USDTSVG } from '@/svg';

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
      popupInfo: 'sddsds',
    },
  ],
};

export const SVGMap: Record<string, FC<SVGProps>> = {
  USDT: USDTSVG,
  MOV: MOVSVG,
  ETH: EthCircleSVG,
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
