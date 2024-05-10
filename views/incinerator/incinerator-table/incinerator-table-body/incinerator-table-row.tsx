import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  IncineratorForm,
  IncineratorTableRowProps,
} from '../../incinerator.types';
import IncineratorTokenObject from '../../incinerator-token-object';
import IncineratorTableBalance from './incinerator-table-balance';
import IncineratorTableCheckbox from './incinerator-table-checkbox';
import QtyIncinerate from './incinerator-table-maybe-input';

const IncineratorTableRow: FC<IncineratorTableRowProps> = ({ index }) => {
  const { control, setValue, getValues } = useFormContext<IncineratorForm>();

  const object = getValues(`objects.${index}`);
  const active = useWatch({ control, name: `objects.${index}.active` });

  const handleCheck = () => setValue(`objects.${index}.active`, !active);

  return (
    <Box
      as="tr"
      key={v4()}
      width="100%"
      cursor="pointer"
      onClick={handleCheck}
      nHover={{ bg: 'lowContainer' }}
      bg={active ? 'lowContainer' : 'unset'}
    >
      <IncineratorTableCheckbox index={index} />
      <Typography pr="m" as="td" py="xs" size="small" variant="label">
        <IncineratorTokenObject object={object} />
      </Typography>
      <IncineratorTableBalance index={index} />
      <Typography pr="m" as="td" size="small" variant="label" width="40%">
        <Box
          gap="s"
          display="flex"
          width={['20rem', '100%']}
          justifyContent="space-between"
        >
          <QtyIncinerate index={index} />
        </Box>
      </Typography>
    </Box>
  );
};

export default IncineratorTableRow;
