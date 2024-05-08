import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableRow from './incinerator-table-row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();
  const { fields } = useFieldArray({ control, name: 'objects' });

  return (
    <Motion as="tbody">
      {fields.map(({ id }, index) => (
        <IncineratorTableRow index={index} key={id} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
