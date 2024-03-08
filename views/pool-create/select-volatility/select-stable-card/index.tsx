import { FC } from 'react';

import SelectVolatilityCard from '../select-volatibility-card';
import Illustration from './illustration';

const SelectStableCard: FC = () => (
  <SelectVolatilityCard
    title="Stable"
    illustration={<Illustration />}
    description="Lorem ipsum dolor sit amet consectetur  elit."
  />
);

export default SelectStableCard;
