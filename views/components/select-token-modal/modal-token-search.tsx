import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC, useId } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import { ModalTokenSearchProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenSearch: FC<ModalTokenSearchProps> = ({
  search,
  handleSelectToken,
}) => {
  const id = useId();
  const { network } = useSuiClientContext();
  const {
    error,
    isLoading,
    data: tokenMetadata,
  } = useSWR(`get-token-metadata-${network}-${search}-${id}`, () =>
    fetch(`/api/auth/v1/coin-metadata?type=${search}&network=${network}`).then(
      (res) => res.json()
    )
  );

  if (isLoading) return <FetchingToken />;

  if (error) return <NotFound />;

  return (
    <TokenModalItem
      key={v4()}
      selected={false}
      type={search as `0x${string}`}
      symbol={tokenMetadata!.symbol}
      onClick={() => handleSelectToken(search)}
    />
  );
};

export default ModalTokenSearch;
