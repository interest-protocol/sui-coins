import { Motion } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useIsFirstRender } from '@/hooks/use-is-first-render';
import { FixedPointMath } from '@/lib';

import { DCAOrderDetailedItemProps } from '../dca-orders.types';
import DCAOrderDetailsContent from './dca-order-details-content';

const MAX = '18446744073709551615';

const DCAOrderDetails: FC<DCAOrderDetailedItemProps> = (props) => {
  const {
    min,
    max,
    orders,
    isOpen,
    amountPerTrade,
    coins: [tokenIn, tokenOut],
  } = props;

  const isFirstRender = useIsFirstRender();

  const orderPrices = orders.map(({ output_amount, timestampMs }) => {
    if (!(tokenIn && tokenOut)) return { valueIn: 0, price: 0, time: 0 };

    const price = FixedPointMath.toNumber(
      BigNumber(output_amount).div(
        FixedPointMath.toNumber(BigNumber(amountPerTrade), tokenIn.decimals)
      ),
      tokenOut.decimals
    );

    return {
      price: Number(+(+price.toFixed(tokenOut.decimals)).toPrecision()),
      time: timestampMs,
    };
  });

  const maxPrice =
    tokenOut && tokenIn && max !== MAX
      ? FixedPointMath.toNumber(
          BigNumber(max).div(
            FixedPointMath.toNumber(BigNumber(amountPerTrade), tokenIn.decimals)
          ),
          tokenOut.decimals
        )
      : null;

  const minPrice =
    tokenOut && tokenIn && Number(min)
      ? FixedPointMath.toNumber(
          BigNumber(min).div(
            FixedPointMath.toNumber(BigNumber(amountPerTrade), tokenIn.decimals)
          ),
          tokenOut.decimals
        )
      : null;

  return (
    <Motion
      key={v4()}
      style={{ originY: 0 }}
      transition={{ ease: 'easeIn' }}
      initial={{
        scaleY: isOpen ? 0 : 1,
        opacity: isOpen ? 1 : 0,
        height: isOpen && !isFirstRender ? 'auto' : 0,
      }}
      animate={{
        scaleY: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : 0,
      }}
    >
      <DCAOrderDetailsContent {...props} />
    </Motion>
  );
};

export default DCAOrderDetails;
