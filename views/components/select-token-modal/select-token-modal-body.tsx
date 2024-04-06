import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { COINS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import NotFound from './not-found';
import {
  CoinDataWithChainInfo,
  SelectTokenModalBodyProps,
  TokenOrigin,
} from './select-token-modal.types';

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  handleSelectToken: onSelectToken,
}) => {
  const network = useNetwork();
  const { coins, isFetchingCoinBalances } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-movement-${network}-favorite-tokens`
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  if (filterSelected === TokenOrigin.Strict && COINS)
    return (
      <ModalTokenBody
        handleSelectToken={onSelectToken}
        tokens={(COINS as Array<CoinDataWithChainInfo>)
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              type.includes(search) || symbol.toLowerCase().includes(search)
          )}
      />
    );

  if (isFetchingCoinBalances) return <FetchingToken />;

  const noWalletToShow = filterSelected == TokenOrigin.Wallet && !coins?.length;

  if (noWalletToShow) return <NotFound />;

  if (filterSelected === TokenOrigin.Wallet && !noWalletToShow)
    return (
      <ModalTokenBody
        handleSelectToken={onSelectToken}
        tokens={(coins as Array<CoinObject>)
          ?.sort(({ type }) => (favoriteTokenTypes?.includes(type) ? -1 : 1))
          .filter(
            ({ symbol, type }) =>
              symbol?.toLowerCase().includes(search) || type?.includes(search)
          )}
      />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
