import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { values } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import {
  MAINNET_BASE_COINS,
  OFFICIAL_TOKENS,
  TESTNET_BASE_COINS,
} from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import ModalTokenSearch from './modal-token-search';
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
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );
  const tokensMetadata = useReadLocalStorage<Record<string, CoinObject>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-tokens-metadata`
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const noTokensToShow =
    !isValidSuiAddress(search) && !coins.length && !favoriteTokenTypes?.length;

  const noFavoritesToShow =
    filterSelected == TokenOrigin.Favorites && !favoriteTokenTypes?.length;

  const noWalletToShow = filterSelected == TokenOrigin.Wallet && !coins?.length;

  if (loading) return <FetchingToken />;

  if (noTokensToShow || noFavoritesToShow || noWalletToShow)
    return <NotFound />;

  if (filterSelected === TokenOrigin.Official)
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={OFFICIAL_TOKENS}
      />
    );

  const favoriteTokens =
    favoriteTokenTypes
      ?.map((type) => coinsMap[type] ?? tokensMetadata?.[type])
      .filter((token) => token) ?? [];

  if (filterSelected === TokenOrigin.Favorites)
    return (
      <ModalTokenBody
        tokens={favoriteTokens}
        handleSelectToken={handleSelectToken}
      />
    );

  const walletCoinsWithoutBase = coins.filter(
    ({ type }) =>
      !values(
        network === Network.MAINNET ? MAINNET_BASE_COINS : TESTNET_BASE_COINS
      ).includes(type)
  );

  if (filterSelected === TokenOrigin.Wallet)
    return (
      <ModalTokenBody
        tokens={walletCoinsWithoutBase}
        handleSelectToken={handleSelectToken}
      />
    );

  const allTokens = walletCoinsWithoutBase.reduce(
    (acc, curr) =>
      acc.some(({ type }) => curr.type === type) ? acc : [...acc, curr],
    favoriteTokens
  );

  if (
    search &&
    isValidSuiAddress(search.split('::')[0]) &&
    !allTokens.some(({ type }) => type === search)
  )
    return (
      <ModalTokenSearch
        search={search}
        tokensMetadata={tokensMetadata ?? {}}
        handleSelectToken={handleSelectToken}
      />
    );

  return (
    <ModalTokenBody
      handleSelectToken={handleSelectToken}
      tokens={allTokens.filter(
        ({ symbol, type }) => symbol.includes(search) || type.includes(search)
      )}
    />
  );
};

export default SelectTokenModalBody;
