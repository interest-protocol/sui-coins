import { Motion } from '@interest-protocol/ui-kit';
import { CoinMetadata } from '@mysten/sui/dist/cjs/client';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableRow from './incinerator-table-row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();

  const { fields } = useFieldArray({ control, name: 'objects' });
  const search = useWatch({ control, name: 'search' });

  console.log('fields', fields);

  const normalizedSearch = search?.toLowerCase().trim() || '';

  const filteredField = fields.filter((el) => {
    if (!normalizedSearch) return true;

    const metadata = el.display?.metadata as Omit<
      CoinMetadata,
      'symbol' | 'decimals'
    >;

    const metadataName = metadata?.name
      ?.toLowerCase()
      .includes(normalizedSearch);

    return (
      el.display?.symbol?.toLowerCase().includes(normalizedSearch) ||
      el.type?.toLowerCase().includes(normalizedSearch) ||
      metadataName ||
      el.display?.type?.toLowerCase().includes(normalizedSearch) ||
      el.objectId?.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <Motion as="tbody">
      {filteredField.map((field, index) => (
        <IncineratorTableRow index={index} object={field} key={field.id} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
