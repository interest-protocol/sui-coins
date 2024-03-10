import { ReactNode } from 'react';
import { v4 } from 'uuid';

import SelectCoins from './select-coins';
import SelectDex from './select-dex';
import SelectVolatility from './select-volatility';

export const stepTitle: ReadonlyArray<ReactNode> = [
  `What type of pool\nyou want to create?`,
  `Choose your \nalgorithm`,
  `Select your coin and \n initial Deposit`,
  `CHOOSE IN WITCH DEX \nYOU WANT YOUR POOL`,
  `Select your coin and \ninitial Deposit`,
];

export const stepContent: ReadonlyArray<ReactNode> = [
  null,
  <SelectVolatility key={v4()} />,
  <SelectCoins key={v4()} />,
  <SelectDex key={v4()} />,
  null,
];
