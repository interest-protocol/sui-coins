import { FC, useEffect, useState } from 'react';

import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata } from '@/utils';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import { FavoritesModalBodyProps } from './select-token-modal.types';

const FavoritesModalBody: FC<FavoritesModalBodyProps> = ({
  types,
  search,
  handleSelectToken,
}) => {
  const network = useNetwork();
  const [coins, setCoins] = useState<ReadonlyArray<CoinMetadataWithType>>([]);
  const [isLoading, setLoading] = useState(false);

<<<<<<< HEAD
=======
  console.log({ types });

>>>>>>> 6819a1bd6c57222245118f935ced0cbe1981c998
  useEffect(() => {
    setLoading(true);
    fetchCoinMetadata({ network, types })
      .then(setCoins)
      .finally(() => setLoading(false));
  }, [types]);

  if (isLoading) return <FetchingToken />;

  return (
    <ModalTokenBody
      handleSelectToken={handleSelectToken}
      tokens={coins.filter(
        ({ symbol, type }) =>
          !search ||
          symbol.toLocaleLowerCase().includes(search.toLowerCase()) ||
          type.includes(search)
      )}
    />
  );
};

export default FavoritesModalBody;
