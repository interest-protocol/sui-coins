import { Chain } from '@interest-protocol/sui-tokens';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import {
  CELER_TOKENS,
  CELER_TOKENS_TYPE,
  STRICT_TOKENS,
  STRICT_TOKENS_TYPE,
  WORMHOLE_TOKENS,
  WORMHOLE_TOKENS_TYPE,
} from '@/constants/coins';
import { useWeb3 } from '@/hooks/use-web3';
import { coinDataToCoinObject } from '@/utils';

import { CoinObject } from '../../../components/web3-manager/coins-manager/web3-manager.types';
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
  const { network } = useSuiClientContext();
  const { coins, coinsMap, loading } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const handleSelectToken = async (type: string, chain?: Chain) => {
    if (coinsMap[type]) return onSelectToken(coinsMap[type]);

    const token = STRICT_TOKENS[network as Network].find(
      (token) => token.type === type
    );

    if (token) return onSelectToken(coinDataToCoinObject(token));

    const metadata = await fetch(
      `/api/auth/v1/coin-metadata?type=${type}&network=${network}`
    ).then((response) =>
      response.status === 200 ? response.json() : response
    );

    return onSelectToken({ ...metadataToCoin(metadata), chain });
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
        tokens={STRICT_TOKENS[network as Network]
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search ||
              symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
              type.includes(search)
          )}
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
        tokens={WORMHOLE_TOKENS[network as Network]
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search ||
              symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
              type.includes(search)
          )}
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
        tokens={CELER_TOKENS[network as Network]
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              !search ||
              symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
              type.includes(search)
          )}
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
