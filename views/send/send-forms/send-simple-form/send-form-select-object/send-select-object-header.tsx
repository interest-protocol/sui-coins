import { Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

import { SendSimpleForm } from '../send-form-simple.types';
import { SendFormSelectObjectProps } from './send-from-select-object.types';

const SendSelectObjectHeader: FC<SendFormSelectObjectProps> = ({ index }) => {
  const { control } = useFormContext<SendSimpleForm>();

  const object = useWatch({
    control,
    name: `objects.${index}`,
  });

  const { type } = object ?? {
    type: undefined,
  };

  const displayName = object?.display
    ? (object.display as Record<string, string>).name ??
      object.display.symbol ??
      type
    : type;

  const symbol = (object?.display as CoinObject)?.symbol ?? '';

  return (
    <Typography
      m="xs"
      pr="xs"
      size="large"
      variant="label"
      overflow="hidden"
      whiteSpace="nowrap"
      width={['auto', '0px']}
      display={['block', 'none']}
    >
      Sending:{' '}
      {symbol ||
        (type && type === displayName ? formatAddress(type) : displayName) ||
        'Select Token'}
    </Typography>
  );
};

export default SendSelectObjectHeader;
