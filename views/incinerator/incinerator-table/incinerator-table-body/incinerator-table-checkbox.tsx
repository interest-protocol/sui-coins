import { Checkbox, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  IncineratorForm,
  IncineratorTableColumnAndRowProps,
} from '../../incinerator.types';

const IncineratorTableCheckbox: FC<IncineratorTableColumnAndRowProps> = ({
  index,
}) => {
  const { control, setValue } = useFormContext<IncineratorForm>();

  const active = useWatch({ control, name: `objects.${index}.active` });

  return (
    <Typography
      as="td"
      key={v4()}
      size="small"
      color="outline"
      variant="label"
      textAlign="left"
    >
      <Checkbox
        label=""
        defaultValue={active}
        onClick={() => setValue(`objects.${index}.active`, not(active))}
      />
    </Typography>
  );
};

export default IncineratorTableCheckbox;
