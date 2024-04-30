import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from '../../pool-create.types';
import SelectVolatilityCard from '../select-volatibility-card';
import Illustration from './illustration';

const SelectStableCard: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const isStable = useWatch({ control, name: 'isStable' });

  return (
    <SelectVolatilityCard
      title="Stable"
      isSelected={isStable === true}
      illustration={<Illustration />}
      onSelect={() => setValue('isStable', true)}
      description="Supports up to 5 Coins."
    />
  );
};

export default SelectStableCard;
