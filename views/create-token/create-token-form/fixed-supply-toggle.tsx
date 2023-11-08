import { SwitchButton } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { FixedSupplyToggleProps } from '../create-token.types';

const FixedSupplyToggle: FC<FixedSupplyToggleProps> = ({
  control,
  setValue,
}) => {
  const value = useWatch({ control, name: 'fixedSupply' });

  return (
    <SwitchButton
      activation
      name="Fixed Supply"
      defaultValue={!!value}
      onClick={() => setValue('fixedSupply', not(value))}
    />
  );
};

export default FixedSupplyToggle;
