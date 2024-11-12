import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import {
  IncineratorForm,
  IncineratorTableColumnAndRowProps,
} from '../../incinerator.types';

const IncineratorTableBalance: FC<IncineratorTableColumnAndRowProps> = ({
  index,
}) => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<IncineratorForm>();

  const type = useWatch({ control, name: `objects.${index}.display.type` });
  const kind = useWatch({ control, name: `objects.${index}.kind` });

  const isCoin = kind === 'Coin';

  const balance = isCoin
    ? coinsMap[type]
      ? FixedPointMath.toNumber(coinsMap[type].balance, coinsMap[type].decimals)
      : 0
    : 1;

  return (
    <Typography pr="m" as="td" size="large" variant="body" whiteSpace="nowrap">
      {isCoin ? formatMoney(balance) : balance}
    </Typography>
  );
};

export default IncineratorTableBalance;
