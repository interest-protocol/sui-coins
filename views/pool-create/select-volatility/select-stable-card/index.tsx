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
      description="Will allow you to have a stable pair, 5 line max."
    />
  );
};

export default SelectStableCard;
