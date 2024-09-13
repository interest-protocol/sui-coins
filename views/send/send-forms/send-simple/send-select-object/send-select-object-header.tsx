import { Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '../../../../../resui/web3-manager/coins-manager/coins-manager.types';
import { ISendSimpleForm } from '../send-simple.types';
import { SendFormSelectObjectProps } from './send-select-object.types';

const SendSelectObjectHeader: FC<SendFormSelectObjectProps> = ({ index }) => {
  const { control } = useFormContext<ISendSimpleForm>();

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
      {symbol ||
        (type && type === displayName ? formatAddress(type) : displayName) ||
        'Select Object'}
    </Typography>
  );
};

export default SendSelectObjectHeader;
