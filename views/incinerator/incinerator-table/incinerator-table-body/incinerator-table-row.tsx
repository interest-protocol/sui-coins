import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';

import IncineratorTokenObject from '../../component/incinerator-token-object';
import {
  IncineratorForm,
  IncineratorTableRowProps,
} from '../../incinerator.types';
import QtyIncinerate from './incinerator-table-maybe-input';

const IncineratorTableRow: FC<IncineratorTableRowProps> = ({ object }) => {
  const { display } = object;

  const index = object.index;
  const { control, setValue } = useFormContext<IncineratorForm>();
  const active = useWatch({ control, name: `objects.${index}.active` });
  const kind = useWatch({ control, name: `objects.${index}.kind` });

  const balance = FixedPointMath.toNumber(
    (display as CoinObject)?.balance,
    (display as CoinObject)?.decimals ?? 0
  );

  const handleCheck = () => setValue(`objects.${index}.active`, !active);

  const isCoin = kind === 'Coin';

  return (
    <Box
      as="tr"
      key={v4()}
      width="100%"
      cursor="pointer"
      nHover={{ bg: 'lowContainer' }}
      bg={active ? 'lowContainer' : 'unset'}
    >
      <Typography
        as="td"
        key={v4()}
        size="small"
        color="outline"
        variant="label"
        textAlign="left"
      >
        <Checkbox defaultValue={active} onClick={handleCheck} label="" />
      </Typography>
      <Typography pr="m" as="td" py="xs" size="small" variant="label">
        <IncineratorTokenObject object={object} />
      </Typography>
      <Typography
        pr="m"
        as="td"
        size="large"
        variant="body"
        whiteSpace="nowrap"
      >
        {isCoin ? balance : '1'}
      </Typography>
      <Typography pr="m" as="td" size="small" variant="label" width="40%">
        <Box display="flex" width="100%" gap="s" justifyContent="space-between">
          <QtyIncinerate index={index} isCoin={isCoin} />
        </Box>
      </Typography>
    </Box>
  );
};

export default IncineratorTableRow;
