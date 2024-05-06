import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableRow from './incinerator-table-row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();
  const objects = useWatch({ control, name: 'objects' });

  return (
    <Motion as="tbody">
      {objects.map((object) => (
        <IncineratorTableRow object={object} key={v4()} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
