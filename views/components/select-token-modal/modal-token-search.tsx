import { FC } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { getBasicCoinMetadata } from '@/hooks/use-get-all-coins';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import { ModalTokenSearchProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenSearch: FC<ModalTokenSearchProps> = ({
  search,
  handleSelectToken,
}) => {
  const {
    error,
    isLoading,
    data: tokenMetadata,
  } = useSWR(`get-token-metadata-${search}`, () =>
    fetch(`/api/v1/coin-metadata?type=${search}`).then((res) => {
      if (res.status === 200) return res.json();

      return getBasicCoinMetadata(search);
    })
  );

  if (isLoading) return <FetchingToken />;

  if (error) return <NotFound />;

  return (
    <TokenModalItem
      key={v4()}
      type={search}
      selected={false}
      symbol={tokenMetadata!.symbol}
      onClick={() => handleSelectToken(search)}
    />
  );
};

export default ModalTokenSearch;
