import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableBodyRow from './row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();
  const fields = useWatch({ control, name: `objects` });

  return (
    <Motion as="tbody">
      {fields?.map((object) => (
        <IncineratorTableBodyRow object={object} asset="Coin" key={v4()} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
