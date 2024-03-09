import { ReactNode } from 'react';
import { v4 } from 'uuid';

import SelectVolatility from './select-volatility';

export const stepTitle: ReadonlyArray<string> = [
  `What type of pool <br /> you w want to create?`,
  `Choose your <br />algorithm`,
  `Select your coin and <br /> initial Deposit`,
  `CHOOSE IN WITCH <br />DEX YOU WANT YOUR POOL`,
  `Select your coin and <br />initial Deposit`,
];

export const stepContent: ReadonlyArray<ReactNode> = [
  null,
  <SelectVolatility key={v4()} />,
  null,
  null,
  null,
];
