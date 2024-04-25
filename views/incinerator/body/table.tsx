import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FilterData } from '../incinerator.data';
import { IncineratorForm } from '../incinerator.types';

const IncineratorBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();
  const filterSelected = useWatch({ control: control, name: 'filter' });

  return <Box>{FilterData[filterSelected]}</Box>;
};

export default IncineratorBody;
