import { Button, TextField } from '@interest-protocol/ui-kit';
import {
  type FC,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useState,
} from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Keys } from '@/constants';
import type { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import type {
  IncineratorForm,
  IncineratorTableRowProps,
} from '../../../incinerator.types';
import IncineratorTableRowActionButton from './incinerator-table-actions';

const IncineratorTableInput: FC<IncineratorTableRowProps> = ({ index }) => {
  const { coinsMap } = useWeb3();
  const { control, setValue, getValues } = useFormContext<IncineratorForm>();

  const display = useWatch({ control, name: `objects.${index}.display` });
  const [oldValue, setOldValue] = useState(getValues(`objects.${index}.value`));

  const balance = coinsMap[`${display?.type}`]
    ? FixedPointMath.toNumber(
        coinsMap[`${display?.type}`].balance,
        coinsMap[`${display?.type}`].decimals
      )
    : 0;

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

  const handleMax: MouseEventHandler<HTMLButtonElement> = (e) => {
    e?.stopPropagation();

    setValue(`objects.${index}.value`, `${balance}`);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === Keys.Enter) return handleApprove(e as any);
    if (e.code === Keys.Escape) return handleCancel(e as any);
  };

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
        Suffix={
          <Button
            p="xs"
            type="button"
            mr="-0.75rem"
            variant="text"
            onClick={handleMax}
          >
            max
          </Button>
        }
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
