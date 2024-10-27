import { Box, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import ChevronDoubleLeft from '@/components/svg/chevron-double-left';
import { Network } from '@/constants';

import { SuccessModalTokenCardProps } from './success-modal.types';

const SuccessModalTokenCard: FC<SuccessModalTokenCardProps> = ({
  to,
  from,
  withoutAmount,
}) => {
  const { network } = useSuiClientContext();

  return (
    <Box
      py="m"
      px="s"
      gap="s"
      bg="surface"
      display="flex"
      borderRadius="xs"
      justifyContent="center"
    >
      <Box display="flex" alignItems="center">
        <TokenIcon
          withBg
          rounded
          size="0.75rem"
          type={from.type}
          symbol={from.symbol}
          network={network as Network}
        />
        <Typography
          alignItems="center"
          textAlign="center"
          color="onSurface"
          fontSize="0.9rem"
          variant="body"
          size="medium"
          display="flex"
          ml="s"
        >
          {`${!withoutAmount ? from?.display : ''} ${from.symbol}`}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <ChevronDoubleLeft
          maxHeight="0.75rem"
          maxWidth="0.75rem"
          width="100%"
        />
      </Box>
      <Box display="flex" alignItems="center">
        <TokenIcon
          withBg
          rounded
          size="0.75rem"
          type={to.type}
          symbol={to.symbol}
          network={network as Network}
        />
        <Typography
          alignItems="center"
          textAlign="center"
          color="onSurface"
          variant="body"
          size="medium"
          display="flex"
          fontSize="0.9rem"
          ml="s"
        >
          {`${!withoutAmount ? to?.display : ''} ${to.symbol}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessModalTokenCard;
