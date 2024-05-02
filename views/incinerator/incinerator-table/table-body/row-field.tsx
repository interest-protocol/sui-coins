import { TextField } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import {
  IncineratorForm,
  IncineratorTableBodyRowFieldProps,
} from '../../incinerator.types';
import IncineratorTableRowActionButton from './row-action-buttons';

const IncineratorTableBodyRowField: FC<IncineratorTableBodyRowFieldProps> = ({
  index,
}) => {
  const { control } = useFormContext<IncineratorForm>();
  const display = useWatch({ control, name: `objects.${index}.display` });
  const value = useWatch({ control, name: `objects.${index}.value` });

  const [currentValue, setCurrentValue] = useState(value);

  return (
    <>
      <TextField
        placeholder="0"
        fontWeight="500"
        fieldProps={{
          height: '2.5rem',
          borderRadius: 'xs',
          bg: 'lowestContainer',
        }}
        value={currentValue}
        onChange={(e) =>
          setCurrentValue(
            parseInputEventToNumberString(
              e,
              FixedPointMath.toNumber(
                (display as CoinObject)?.balance ?? ZERO_BIG_NUMBER,
                (display as CoinObject)?.decimals ?? 0
              )
            )
          )
        }
      />
      <IncineratorTableRowActionButton value={currentValue} index={index} />
    </>
  );
};

export default IncineratorTableBodyRowField;
