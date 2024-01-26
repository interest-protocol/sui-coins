import { Box } from '@interest-protocol/ui-kit';
import { values } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import {
  COIN_TYPE_TO_COIN,
  MAINNET_BASE_COINS,
  TESTNET_BASE_COINS,
} from '@/constants/coins';
import { TOKEN_SVG_MAP } from '@/constants/token';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { BNBSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

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
  tokenOrigin,
  handleSelectToken,
}) => (
  <>
    {tokens?.map(({ symbol, origin, decimals, totalBalance, type }) => {
      const Icon = TOKEN_SVG_MAP[type] ?? BNBSVG;

      return (
        <TokenModalItem
          key={v4()}
          type={type}
          Icon={Icon}
          origin={origin}
          symbol={symbol}
          selected={false}
          onClick={() =>
            handleSelectToken({
              symbol,
              decimals,
              type,
              balance: FixedPointMath.toNumber(
                totalBalance ?? ZERO_BIG_NUMBER,
                decimals || 9
              ),
            })
          }
          isSuggested={tokenOrigin === TokenOrigin.Suggested}
          balance={FixedPointMath.toNumber(
            totalBalance ?? ZERO_BIG_NUMBER,
            decimals || 9
          ).toString()}
        />
      );
    })}
  </>
);

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  loading,
  handleSelectToken,
}) => {
  const { network } = useNetwork();
  const { coins, coinsMap } = useWeb3();
  const favoriteTokens = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );
  const filterSelected = useWatch({ control, name: 'filter' });

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
        ) : !(coins.length || favoriteTokens?.length) ? (
          <NotFound />
        ) : filterSelected == TokenOrigin.All ? (
          <>
            <ModalTokenBody
              tokens={coins ?? []}
              tokenOrigin={TokenOrigin.All}
              handleSelectToken={handleSelectToken}
            />
            <ModalTokenBody
              tokenOrigin={TokenOrigin.Favorites}
              handleSelectToken={handleSelectToken}
              tokens={
                (favoriteTokens?.map((token) => coinsMap[token]) ??
                  []) as ReadonlyArray<TokenProps>
              }
            />
          </>
        ) : filterSelected == TokenOrigin.Favorites &&
          favoriteTokens?.length ? (
          <ModalTokenBody
            tokens={coins ?? []}
            tokenOrigin={TokenOrigin.Favorites}
            handleSelectToken={handleSelectToken}
          />
        ) : filterSelected == TokenOrigin.Suggested && coins.length ? (
          <ModalTokenBody
            tokens={
              values(
                network === Network.MAINNET
                  ? MAINNET_BASE_COINS
                  : TESTNET_BASE_COINS
              ).map((type) => COIN_TYPE_TO_COIN[network][type]) ?? []
            }
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
