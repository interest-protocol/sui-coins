import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import {
  CELER_TOKENS,
  CELER_TOKENS_TYPE,
  STRICT_TOKENS,
  STRICT_TOKENS_TYPE,
  WORMHOLE_TOKENS,
  WORMHOLE_TOKENS_TYPE,
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
import { metadataToCoin } from './select-token-modal.utils';

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  loading,
  handleSelectToken: onSelectToken,
}) => {
  const suiClient = useSuiClient();
  const { network } = useNetwork();
  const { coins, coinsMap, isFetchingCoinBalances } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );

  const { data } = useSWR<ReadonlyArray<CoinMetadataWithType>>(
    'coin-metadata',
    async () => fetch('/api/v1/coin-metadata').then((res) => res.json())
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const handleSelectToken = async (type: string) => {
    if (coinsMap[type]) return onSelectToken(coinsMap[type]);

    const dbCoinMetadata = data?.find((metadata) => type === metadata.type);

    if (dbCoinMetadata) return onSelectToken(metadataToCoin(dbCoinMetadata));

    const bcCoinMetadata = await suiClient.getCoinMetadata({ coinType: type });

    const metadata = {
      ...(bcCoinMetadata ?? getBasicCoinMetadata(type)),
      type,
    };

    fetch(`/api/v1/coin-metadata`, {
      method: 'POST',
      body: JSON.stringify(metadata),
    });

    return onSelectToken(metadataToCoin(metadata));
  };

  const isSearchAddress =
    isValidSuiAddress(search.split('::')[0]) && search.split('::').length > 2;

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Strict) ||
    (filterSelected === TokenOrigin.Strict &&
      isSearchAddress &&
      STRICT_TOKENS_TYPE[network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={STRICT_TOKENS[network]
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
      WORMHOLE_TOKENS_TYPE[network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={WORMHOLE_TOKENS[network]
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
      CELER_TOKENS_TYPE[network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={CELER_TOKENS[network]
          .sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search || symbol.includes(search) || type.includes(search)
          )}
      />
    );

  if (loading || isFetchingCoinBalances) return <FetchingToken />;

  const noWalletToShow = filterSelected == TokenOrigin.Wallet && !coins?.length;

  if (noWalletToShow) return <NotFound />;

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

  if (isSearchAddress)
    return (
      <ModalTokenSearch search={search} handleSelectToken={handleSelectToken} />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
