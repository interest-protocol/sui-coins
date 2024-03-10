import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from '../../pool-create.types';
import SelectTypeCard from '../select-type-card';
import Illustration from './illustration';

const SelectTypeAMM: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: 'type' });

  return (
    <SelectTypeCard
      title="AMM"
      isSelected={type === 'AMM'}
      illustration={<Illustration />}
      onSelect={() => setValue('type', 'AMM')}
      description="The Liquidity is spread from 0$ to Infinity"
    />
  );
};

export default SelectTypeAMM;
