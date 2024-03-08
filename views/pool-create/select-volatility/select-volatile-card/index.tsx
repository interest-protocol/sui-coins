import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from '../../pool-create.types';
import SelectVolatilityCard from '../select-volatibility-card';
import Illustration from './illustration';

const SelectVolatileCard: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const isStable = useWatch({ control, name: 'isStable' });

  return (
    <SelectVolatilityCard
      title="Volatile"
      illustration={<Illustration />}
      isSelected={isStable === false}
      onSelect={() => setValue('isStable', false)}
      description="Will allow you to have a volatile pair, 3 line max."
    />
  );
};

export default SelectVolatileCard;
