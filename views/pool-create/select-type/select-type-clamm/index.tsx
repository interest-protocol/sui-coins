import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from '../../pool-create.types';
import SelectTypeCard from '../select-type-card';
import Illustration from './illustration';

const SelectTypeCLAMM: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: 'type' });

  return (
    <SelectTypeCard
      disabled
      title="CLAMM"
      isSelected={type === 'CLAMM'}
      illustration={<Illustration />}
      onSelect={() => setValue('type', 'CLAMM')}
      description="The LP uses the capital efficiently"
    />
  );
};

export default SelectTypeCLAMM;
