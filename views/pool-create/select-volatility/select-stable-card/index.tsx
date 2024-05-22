import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PoolTypeEnum } from '@/interface';

import { CreatePoolForm } from '../../pool-create.types';
import SelectVolatilityCard from '../select-volatibility-card';
import Illustration from './illustration';

const SelectStableCard: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: 'type' });
  const isStable = useWatch({ control, name: 'isStable' });

  return (
    <SelectVolatilityCard
      title="Stable"
      isSelected={isStable === true}
      illustration={<Illustration />}
      onSelect={() => setValue('isStable', true)}
      description={`Supports up to ${type === PoolTypeEnum.CLAMM ? 5 : 2} Coins.`}
    />
  );
};

export default SelectStableCard;
