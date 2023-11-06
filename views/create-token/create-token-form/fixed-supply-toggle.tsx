import { SwitchButton } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { Control, useWatch } from 'react-hook-form';

import { ICreateTokenForm } from '../create-token.types';

const FixedSupplyToggle: FC<{ control: Control<ICreateTokenForm> }> = ({
  control,
}) => {
  const value = useWatch({ control, name: 'fixedSupply' });

  return <SwitchButton name="Fixed Supply" defaultValue={!!value} activation />;
};

export default FixedSupplyToggle;
