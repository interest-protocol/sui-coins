import { Box } from '@interest-protocol/ui-kit';
import { values } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import {
  COIN_TYPE_TO_COIN,
  MAINNET_BASE_COINS,
  TESTNET_BASE_COINS,
} from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import NotFound from './not-found';
import {
  SelectTokenModalBodyProps,
  TokenOrigin,
} from './select-token-modal.types';

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
              tokens={favoriteTokens?.map((token) => coinsMap[token]) ?? []}
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
              ).map((type) => ({
                ...COIN_TYPE_TO_COIN[network][type],
                ...coinsMap[type],
              })) ?? []
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
