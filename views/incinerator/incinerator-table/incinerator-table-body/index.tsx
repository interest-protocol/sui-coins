import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableRow from './incinerator-table-row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();

  const { fields } = useFieldArray({ control, name: 'objects' });
  const search = useWatch({ control, name: 'search' });

  const normalizedSearch = search?.toLowerCase().trim() || '';

  const filteredField = fields.filter((el) =>
    normalizedSearch
      ? el.display?.symbol?.toLowerCase().includes(normalizedSearch)
      : fields
  );

  return (
    <Motion as="tbody">
      {filteredField.map((field, index) => (
        <IncineratorTableRow index={index} object={field} key={field.id} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
