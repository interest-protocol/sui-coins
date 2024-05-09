import { TextField } from '@interest-protocol/ui-kit';
import {
  type FC,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Keys } from '@/constants';
import type { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import type {
  IncineratorForm,
  IncineratorTableRowProps,
} from '../../../incinerator.types';
import IncineratorTableRowActionButton from './incinerator-table-actions';

const IncineratorTableInput: FC<IncineratorTableRowProps> = ({ index }) => {
  const { control, setValue, getValues } = useFormContext<IncineratorForm>();

  const display = useWatch({ control, name: `objects.${index}.display` });
  const [oldValue, setOldValue] = useState(getValues(`objects.${index}.value`));

  const handleApprove: MouseEventHandler<HTMLDivElement> = (e) => {
    e?.stopPropagation();

    const value = getValues(`objects.${index}.value`);
    setOldValue(value);

    setValue(`objects.${index}.isEditing`, false);
  };

  const handleCancel: MouseEventHandler<HTMLDivElement> = (e) => {
    e?.stopPropagation();

    setValue(`objects.${index}.value`, oldValue);

    setValue(`objects.${index}.isEditing`, false);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === Keys.Enter) return handleApprove(e as any);
    if (e.code === Keys.Escape) return handleCancel(e as any);
  };

  const handleDocumentKeyDown = (e: KeyboardEvent) => {
    onKeyDown(e as any);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, []);

  return (
    <>
      <TextField
        placeholder="0"
        fontWeight="500"
        onKeyDown={onKeyDown}
        defaultValue={oldValue}
        onClick={(e) => e.stopPropagation()}
        fieldProps={{
          height: '2.5rem',
          borderRadius: 'xs',
          bg: 'lowestContainer',
        }}
        onChange={(e) =>
          setValue(
            `objects.${index}.value`,
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
      <IncineratorTableRowActionButton
        handleCancel={handleCancel}
        handleApprove={handleApprove}
      />
    </>
  );
};

export default IncineratorTableInput;
