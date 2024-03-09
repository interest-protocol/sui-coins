import { ReactNode } from 'react';
import { v4 } from 'uuid';

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
  null,
  null,
  null,
];
