import { Chain } from '@interest-protocol/sui-tokens';
import { isValidSuiAddress } from '@mysten/sui/utils';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import {
  CELER_TOKENS,
  CELER_TOKENS_TYPE,
  STRICT_TOKENS,
  STRICT_TOKENS_MAP,
  STRICT_TOKENS_TYPE,
  WORMHOLE_TOKENS,
  WORMHOLE_TOKENS_TYPE,
} from '@/constants/coins';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { CoinMetadataWithType } from '@/interface';
import { coinDataToCoinObject, fetchCoinMetadata } from '@/utils';

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
  handleSelectToken: onSelectToken,
}) => {
  const network = useNetwork();
  const { coins, coinsMap, loading } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const handleSelectToken = async (type: string, chain?: Chain) => {
    if (coinsMap[type]) return onSelectToken(coinsMap[type]);

    const token = STRICT_TOKENS_MAP[network as Network][type];

    if (token) return onSelectToken(coinDataToCoinObject(token));

    const metadata = await fetchCoinMetadata({ type, network });

    return onSelectToken({
      ...metadataToCoin(metadata as CoinMetadataWithType),
      chain,
    });
  };

  const isSearchAddress =
    isValidSuiAddress(search.split('::')[0]) && search.split('::').length > 2;

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Strict) ||
    (filterSelected === TokenOrigin.Strict &&
      isSearchAddress &&
      STRICT_TOKENS_TYPE[network as Network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={[
          ...STRICT_TOKENS[network as Network].filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              favoriteTokenTypes?.includes(type)
          ),
          ...STRICT_TOKENS[network as Network].filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              !favoriteTokenTypes?.includes(type)
          ),
        ]}
      />
    );

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Wormhole) ||
    (filterSelected === TokenOrigin.Wormhole &&
      isSearchAddress &&
      WORMHOLE_TOKENS_TYPE[network as Network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={[
          ...WORMHOLE_TOKENS[network as Network].filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              favoriteTokenTypes?.includes(type)
          ),
          ...WORMHOLE_TOKENS[network as Network].filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              !favoriteTokenTypes?.includes(type)
          ),
        ]}
      />
    );

  if (
    (!isSearchAddress && filterSelected === TokenOrigin.Celer) ||
    (filterSelected === TokenOrigin.Celer &&
      isSearchAddress &&
      CELER_TOKENS_TYPE[network as Network].includes(search))
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={[
          ...CELER_TOKENS[network as Network].filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              favoriteTokenTypes?.includes(type)
          ),
          ...CELER_TOKENS[network as Network].filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              !favoriteTokenTypes?.includes(type)
          ),
        ]}
      />
    );

  if (loading) return <FetchingToken />;

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
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
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
