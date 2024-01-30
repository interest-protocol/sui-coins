import { FC } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import { ModalTokenSearchProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenSearch: FC<ModalTokenSearchProps> = ({
  search,
  tokensMetadata,
  handleSelectToken,
}) => {
  const { network } = useNetwork();
  const suiClient = useSuiClient();

  const {
    data: tokenMetadata,
    error,
    isLoading,
  } = useSWR(`get-token-metadata`, () =>
    suiClient.getCoinMetadata({ coinType: search })
  );

  if (isLoading) return <FetchingToken />;

  if (error) return <NotFound />;

  const token = {
    type: search,
    objects: [],
    balance: '0',
    metadata: tokenMetadata!,
    symbol: tokenMetadata!.symbol,
    coinObjectId: tokenMetadata!.id!,
    decimals: tokenMetadata!.decimals,
  };

  const saveMetadata = () => {
    if (!tokensMetadata[search])
      window.localStorage.setItem(
        `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-tokens-metadata`,
        JSON.stringify({ ...tokensMetadata, [search]: token })
      );
  };

  return (
    <TokenModalItem
      key={v4()}
      balance=""
      type={search}
      selected={false}
      symbol={tokenMetadata!.symbol}
      onHandleFavorite={saveMetadata}
      onClick={() => {
        handleSelectToken(token);
        saveMetadata();
      }}
    />
  );
};

export default ModalTokenSearch;
