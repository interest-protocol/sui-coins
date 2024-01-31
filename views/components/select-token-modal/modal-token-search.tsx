import { FC } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { getBasicCoinMetadata } from '@/hooks/use-get-all-coins';
import { useSuiClient } from '@/hooks/use-sui-client';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import { ModalTokenSearchProps } from './select-token-modal.types';
import { metadataToCoin } from './select-token-modal.utils';
import TokenModalItem from './token-modal-item';

const ModalTokenSearch: FC<ModalTokenSearchProps> = ({
  search,
  handleSelectToken,
}) => {
  const suiClient = useSuiClient();

  const {
    error,
    isLoading,
    data: tokenMetadata,
  } = useSWR(`get-token-metadata-${search}`, () =>
    fetch(`/api/v1/coin-metadata?type=${search}`).then((res) => {
      if (res.status === 200) return res.json();

      if (res.status === 204)
        return suiClient.getCoinMetadata({ coinType: search }).then((data) => {
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
    })
  );

  if (isLoading) return <FetchingToken />;

  if (error) return <NotFound />;

  const token = metadataToCoin(tokenMetadata);

  return (
    <TokenModalItem
      key={v4()}
      balance=""
      type={search}
      selected={false}
      symbol={tokenMetadata!.symbol}
      onClick={() => handleSelectToken(token)}
    />
  );
};

export default ModalTokenSearch;
