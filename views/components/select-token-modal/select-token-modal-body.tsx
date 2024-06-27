import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { LOCAL_STORAGE_VERSION } from '@/constants';
import { COINS, FAUCET_COINS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
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
  faucet,
  control,
  handleSelectToken: onSelectToken,
}) => {
  const network = useNetwork();
  const { coins, loading, coinsMap } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-movement-${network}-favorite-tokens`
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const isSearchAddress =
    isValidSuiAddress(search.split('::')[0]) && search.split('::').length > 2;

  const handleSelectToken = (type: string) => onSelectToken(coinsMap[type]);

  if (!isSearchAddress && filterSelected === TokenOrigin.Strict && COINS)
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={[
          ...(faucet ? FAUCET_COINS : COINS).filter(
            ({ symbol, type }) =>
              (!search ||
                symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
                type.includes(search)) &&
              favoriteTokenTypes?.includes(type)
          ),
          ...(faucet ? FAUCET_COINS : COINS).filter(
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

  if (!isSearchAddress && noWalletToShow) return <NotFound />;

  if (
    !isSearchAddress &&
    filterSelected === TokenOrigin.Wallet &&
    !noWalletToShow
  )
    return (
      <ModalTokenBody
        handleSelectToken={handleSelectToken}
        tokens={(coins as Array<CoinObject>)
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              symbol?.toLowerCase().includes(search) || type?.includes(search)
          )}
      />
    );

  if (isSearchAddress)
    return (
      <ModalTokenSearch search={search} handleSelectToken={onSelectToken} />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
