import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';
import { PoolToken } from '@/views/pools/pools.types';

import { SelectionFieldValues, TokenListProps } from './withdraw.types';

const SelectionTokenList: FC<TokenListProps> = ({ type }) => {
  const network = useNetwork();
  const { getValues } = useFormContext();

  const tokenList = getValues(`tokenList`) as Array<PoolToken>;

  const [tokenSelected, setTokenSelected] = useState(tokenList[0].type);

  const isOneCoin = type === SelectionFieldValues.OneCoin;

  return (
    <Box py="xs" borderTop="2px solid" borderColor="lowestContainer">
      {tokenList.map((token) => {
        const Icon = TOKEN_ICONS[network][token.symbol];

        return (
          <Box
            key={v4()}
            py="m"
            px="xl"
            display="flex"
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            transition="all 350ms ease-in-out"
            onClick={() => setTokenSelected(token.type)}
            nHover={{
              bg: 'lowContainer',
            }}
          >
            <Box display="flex" gap="xs" alignItems="center">
              {isOneCoin && (
                <RadioButton defaultValue={tokenSelected === token.type} />
              )}
              <Box
                display="flex"
                bg="onSurface"
                width="2.5rem"
                height="2.5rem"
                borderRadius="xs"
                alignItems="center"
                justifyContent="center"
                color="lowestContainer"
                ml={isOneCoin ? 's' : 'unset'}
              >
                <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
              </Box>
              <Typography variant="body" size="large">
                {token.symbol}
              </Typography>
            </Box>
            <Typography variant="body" ml="m" size="large">
              {isOneCoin ? token.value : token.balance}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SelectionTokenList;
