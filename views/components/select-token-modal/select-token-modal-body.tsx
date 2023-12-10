import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { BNBSVG } from '@/svg';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import {
  ModalTokenBodyProps,
  SelectTokenModalBodyProps,
  TokenOrigin,
  TokenProps,
} from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  isFavorite,
  tokenOrigin,
  handleSelectToken,
}) => {
  return (
    <>
      {tokens.map(({ symbol, symbol2, decimals, totalBalance }) => (
        <TokenModalItem
          key={v4()}
          Icon={BNBSVG}
          symbol={symbol}
          selected={false}
          symbol2={symbol2 || ''}
          isFavorite={isFavorite}
          onClick={handleSelectToken}
          favorite={tokenOrigin === TokenOrigin.Favorites}
          balance={FixedPointMath.toNumber(totalBalance, decimals).toString()}
        />
      ))}
    </>
  );
};

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  loading,
  handleSelectToken,
  formSearchToken: { control },
}) => {
  const filterSeleted = useWatch({ control, name: 'filter' });
  const TOKENS: ReadonlyArray<TokenProps> = [
    {
      type: '',
      decimals: 9,
      symbol: 'SUI',
      totalBalance: BigNumber(0),
    },
    {
      type: '',
      decimals: 9,
      symbol: 'USDC',
      symbol2: 'ETH',
      totalBalance: BigNumber(0),
    },
    {
      type: '',
      decimals: 9,
      symbol: 'BTC',
      totalBalance: BigNumber(0),
    },
  ];

  const TOKENS_FAVORITE: ReadonlyArray<TokenProps> = [
    {
      type: '',
      decimals: 9,
      symbol: 'ETH',
      totalBalance: BigNumber(0),
    },
  ];

  return (
    <>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        flexDirection="column"
        bg="lowContainer"
      >
        {loading ? (
          <FetchingToken />
        ) : !(TOKENS.length || TOKENS_FAVORITE.length) ? (
          <NotFound />
        ) : filterSeleted == TokenOrigin.All ? (
          <>
            <ModalTokenBody
              tokens={TOKENS}
              tokenOrigin={TokenOrigin.Suggested}
              handleSelectToken={handleSelectToken}
            />
            <ModalTokenBody
              tokens={TOKENS_FAVORITE}
              tokenOrigin={TokenOrigin.Favorites}
              handleSelectToken={handleSelectToken}
            />
          </>
        ) : filterSeleted == TokenOrigin.Favorites && TOKENS_FAVORITE.length ? (
          <ModalTokenBody
            tokens={TOKENS_FAVORITE}
            tokenOrigin={TokenOrigin.Favorites}
            handleSelectToken={handleSelectToken}
          />
        ) : filterSeleted == TokenOrigin.Suggested && TOKENS.length ? (
          <ModalTokenBody
            tokens={TOKENS}
            tokenOrigin={TokenOrigin.Suggested}
            handleSelectToken={handleSelectToken}
          />
        ) : (
          <NotFound />
        )}
        {/**Condition needs improve */}
      </Box>
    </>
  );
};

export default SelectTokenModalBody;
