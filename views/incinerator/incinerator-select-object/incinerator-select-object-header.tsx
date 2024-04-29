import { Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

import { IncineratorForm } from '../incinerator.types';
import { IncineratorSelectObjectProps } from './incinerator-select-object.types';

const IncineratorSelectObjectHeader: FC<IncineratorSelectObjectProps> = ({
  index,
}) => {
  const { control } = useFormContext<IncineratorForm>();

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

export default IncineratorSelectObjectHeader;
