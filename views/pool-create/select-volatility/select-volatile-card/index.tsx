import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PoolTypeEnum } from '@/interface';

import { CreatePoolForm } from '../../pool-create.types';
import SelectVolatilityCard from '../select-volatibility-card';
import Illustration from './illustration';

const SelectVolatileCard: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const isStable = useWatch({ control, name: 'isStable' });
  const type = useWatch({ control, name: 'type' });

  return (
    <SelectVolatilityCard
      title="Volatile"
      illustration={<Illustration />}
      isSelected={isStable === false}
      onSelect={() => setValue('isStable', false)}
      description={`Supports up to ${type === PoolTypeEnum.CLAMM ? 3 : 2} Coins.`}
    />
  );
};

export default SelectVolatileCard;
