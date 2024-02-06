import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import {
  CELER_TOKENS,
  STRICT_TOKENS,
  WORMHOLE_TOKENS,
} from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { getBasicCoinMetadata } from '@/hooks/use-get-all-coins';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useSuiClient } from '@/hooks/use-sui-client';
import { useWeb3 } from '@/hooks/use-web3';
import { CoinMetadataWithType } from '@/interface';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import ModalTokenSearch from './modal-token-search';
import NotFound from './not-found';
import {
  SelectTokenModalBodyProps,
  TokenOrigin,
} from './select-token-modal.types';
import { mapMetadataToCoin } from './select-token-modal.utils';

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  loading,
  handleSelectToken: onSelectToken,
}) => {
  const suiClient = useSuiClient();
  const { network } = useNetwork();
  const { coins, coinsMap } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );

  const {
    data: coinsMetadataRaw,
    isLoading,
    error,
  } = useSWR('coins-metadata', async () =>
    fetch('/api/v1/coin-metadata').then((res) => res.json())
  );

  const coinsMetadata: Record<string, CoinMetadataWithType> =
    isLoading || error
      ? {}
      : (coinsMetadataRaw as ReadonlyArray<CoinMetadataWithType>).reduce(
          (acc, curr) => ({ ...acc, [curr.type]: curr }),
          {}
        );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const noWalletToShow = filterSelected == TokenOrigin.Wallet && !coins?.length;

  const handleSelectToken = (coin: CoinObject) => {
    onSelectToken(coin);

    const hasCoinMetadataOnDB = coinsMetadata[coin.type];

    if (!hasCoinMetadataOnDB)
      suiClient.getCoinMetadata({ coinType: search }).then((data) => {
        const metadata = {
          ...(data ?? getBasicCoinMetadata(search)),
          type: search,
        };

        fetch(`/api/v1/coin-metadata`, {
          method: 'POST',
          body: JSON.stringify(metadata),
        });

        return metadata;
      });
  };

  const isSearchAddress =
    isValidSuiAddress(search.split('::')[0]) && search.split('::').length > 2;

  if (loading || isLoading) return <FetchingToken />;

  if (noWalletToShow) return <NotFound />;

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Strict) ||
    (filterSelected === TokenOrigin.Strict &&
      isSearchAddress &&
      STRICT_TOKENS[network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={STRICT_TOKENS[network]
          .map(
            (type) => coinsMap[type] ?? mapMetadataToCoin(type, coinsMetadata)
          )
          .sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search || symbol.includes(search) || type.includes(search)
          )}
      />
    );

  if (
    (!noWalletToShow &&
      !isSearchAddress &&
      filterSelected === TokenOrigin.Wallet) ||
    (filterSelected === TokenOrigin.Wallet &&
      isSearchAddress &&
      !!coinsMap[search])
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={(coins as Array<CoinObject>)
          .sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search || symbol.includes(search) || type.includes(search)
          )}
      />
    );

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Wormhole) ||
    (filterSelected === TokenOrigin.Wormhole &&
      isSearchAddress &&
      WORMHOLE_TOKENS[network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={WORMHOLE_TOKENS[network]
          .map(
            (type) => coinsMap[type] ?? mapMetadataToCoin(type, coinsMetadata)
          )
          .sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search || symbol.includes(search) || type.includes(search)
          )}
      />
    );

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Celer) ||
    (filterSelected === TokenOrigin.Celer &&
      isSearchAddress &&
      CELER_TOKENS[network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={CELER_TOKENS[network]
          .map(
            (type) => coinsMap[type] ?? mapMetadataToCoin(type, coinsMetadata)
          )
          .sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search || symbol.includes(search) || type.includes(search)
          )}
      />
    );

  if (isSearchAddress)
    return (
      <ModalTokenSearch search={search} handleSelectToken={handleSelectToken} />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
