import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableRow from './incinerator-table-row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();
  const objects = useWatch({ control, name: 'objects' });
<<<<<<< HEAD
=======
  const searchAssetsValue = useWatch({ control, name: 'searchAssets' });

  const filteredObjects =
    (searchAssetsValue?.trim() || '') === ''
      ? objects
      : objects.filter(
          (object) =>
            object.display?.symbol
              ?.toLowerCase()
              ?.includes(searchAssetsValue.toLowerCase()) ||
            object.display?.coinObjectId?.includes(
              searchAssetsValue.toLowerCase()
            ) ||
            object.display?.coinObjectId?.includes(
              searchAssetsValue.toLowerCase()
            ) ||
            object.display?.type?.includes(searchAssetsValue.toLowerCase())
        );
>>>>>>> 75b973f5d44acb40e2eb8969ac892fec6f2aa74a

  return (
    <Motion as="tbody">
      {objects.map((object) => (
        <IncineratorTableRow object={object} key={v4()} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
