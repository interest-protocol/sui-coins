import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';
import {
  getKindFromObjectData,
  getSymbolByType,
  ZERO_BIG_NUMBER,
} from '@/utils';

import {
  IncineratorForm,
  IncineratorTableRowProps,
} from '../../incinerator.types';
import QtyIncinerate from './incinerator-table-maybe-input';

const IncineratorTableRow: FC<IncineratorTableRowProps> = ({ object }) => {
  const network = useNetwork();
  const { display, type } = object;
  const displayName = display
    ? (display as Record<string, string>).name ?? display.symbol ?? type
    : type;

  const { symbol, type: coinType } = (display as CoinObject) ?? {
    type,
    symbol: getSymbolByType(type),
  };

  const index = object.index;
  const url = (display as Record<string, string>)?.image_url;
  const { control, setValue } = useFormContext<IncineratorForm>();
  const active = useWatch({ control, name: `objects.${index}.active` });
  const editable = useWatch({ control, name: `objects.${index}.editable` });

  const balance = FixedPointMath.toNumber(
    (display as CoinObject)?.balance ?? ZERO_BIG_NUMBER,
    (display as CoinObject)?.decimals ?? 0
  );

  const handleCheck = () => setValue(`objects.${index}.active`, !active);

  const objectKind = getKindFromObjectData(object);

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
      <Typography
        pr="m"
        as="td"
        gap="s"
        py="xs"
        size="small"
        display="flex"
        variant="label"
        alignItems="center"
      >
        <TokenIcon
          withBg
          size="1.6rem"
          symbol={symbol}
          {...(url ? { url } : { type: coinType, network })}
        />
        <Box>
          <Typography size="medium" variant="body" whiteSpace="nowrap">
            {type === displayName ? formatAddress(type) : displayName}
          </Typography>
          <Typography
            as="span"
            size="small"
            variant="body"
            color="outline"
            whiteSpace="nowrap"
          >
            Type: {objectKind}
          </Typography>
        </Box>
      </Typography>
      <Typography
        pr="m"
        as="td"
        size="large"
        variant="body"
        whiteSpace="nowrap"
      >
        {!editable ? '1' : balance}
      </Typography>
      <Typography pr="m" as="td" size="large" variant="label" width="30%">
        <Box display="flex" justifyContent="space-between">
          <QtyIncinerate index={index} />
        </Box>
      </Typography>
    </Box>
  );
};

export default IncineratorTableRow;
