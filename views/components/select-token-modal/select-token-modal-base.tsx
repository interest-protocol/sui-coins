import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { DEX_MAIN_TOKENS } from '@/constants/dex';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import {
  SelectTokenBaseTokenItemProps,
  SelectTokenBaseTokensProps,
} from './select-token-modal.types';

const SelectTokenBaseTokenItem: FC<SelectTokenBaseTokenItemProps> = ({
  type,
  symbol,
  network,
  handleSelectToken,
}) => (
  <Tag
    size="small"
    display="flex"
    variant="outline"
    justifyContent="center"
    onClick={handleSelectToken}
    PrefixIcon={
      <Box
        bg="black"
        color="white"
        display="flex"
        width="1.5rem"
        height="1.5rem"
        alignItems="center"
        borderRadius="full"
        justifyContent="center"
      >
        <TokenIcon
          network={network}
          maxWidth="1.2rem"
          maxHeight="1.2rem"
          tokenId={network === Network.MAINNET ? type : symbol}
        />
      </Box>
    }
  >
    <Typography variant="label" size="large">
      {symbol}
    </Typography>
  </Tag>
);

const SelectTokenBaseTokens: FC<SelectTokenBaseTokensProps> = ({
  handleSelectToken,
}) => {
  const { network } = useNetwork();
  const { coinsMap } = useWeb3();

  return (
    <Box
      py="xs"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr 1fr 1fr"
      gap={['0.25rem', '0.25rem', '0.25rem', 'xs']}
    >
      {DEX_MAIN_TOKENS[network].map((token) => (
        <SelectTokenBaseTokenItem
          key={v4()}
          network={network}
          handleSelectToken={() =>
            handleSelectToken({
              ...token,
              balance: FixedPointMath.toNumber(
                coinsMap[token.type]?.totalBalance || ZERO_BIG_NUMBER,
                token.decimals
              ),
            })
          }
          {...token}
        />
      ))}
    </Box>
  );
};

export default SelectTokenBaseTokens;
