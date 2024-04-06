import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';

import ModalObjectBody from './modal-object-body';
import NotFound from './not-found';
import {
  ObjectOrigin,
  SelectObjectModalBodyProps,
} from './select-object-modal.types';

const SelectObjectModalBody: FC<SelectObjectModalBodyProps> = ({
  control,
  handleSelectObject,
}) => {
  const network = useNetwork();
  const { coinsObjects, ownedNfts, otherObjects } = useWeb3();
  const favoriteObjectTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-objects`
  );

  const filterSelected = useWatch({ control, name: 'filter' });
  const search = useWatch({ control, name: 'search' });

  const isSearchAddress =
    isValidSuiAddress(search.split('::')[0]) && search.split('::').length > 2;

  if (
    (!isSearchAddress && filterSelected === ObjectOrigin.Coins) ||
    (filterSelected === ObjectOrigin.Coins &&
      isSearchAddress &&
      coinsObjects.some(({ type }) => type === search))
  )
    return (
      <ModalObjectBody
        handleSelectObject={handleSelectObject}
        objects={Array(...coinsObjects)
          ?.sort(({ type }) => (favoriteObjectTypes?.includes(type) ? -1 : 1))
          .filter(({ type }) => !search || type.includes(search))}
      />
    );

  if (
    (!isSearchAddress && filterSelected === ObjectOrigin.NFT) ||
    (filterSelected === ObjectOrigin.NFT &&
      isSearchAddress &&
      ownedNfts.some(({ type }) => type === search))
  )
    return (
      <ModalObjectBody
        handleSelectObject={handleSelectObject}
        objects={Array(...ownedNfts)
          ?.sort(({ type }) => (favoriteObjectTypes?.includes(type) ? -1 : 1))
          .filter(({ type }) => !search || type.includes(search))}
      />
    );

  if (
    (!isSearchAddress && filterSelected === ObjectOrigin.Objects) ||
    (filterSelected === ObjectOrigin.Objects &&
      isSearchAddress &&
      otherObjects.some(({ type }) => type === search))
  )
    return (
      <ModalObjectBody
        handleSelectObject={handleSelectObject}
        objects={Array(...otherObjects)
          ?.sort(({ type }) => (favoriteObjectTypes?.includes(type) ? -1 : 1))
          .filter(({ type }) => !search || type.includes(search))}
      />
    );

  return <NotFound />;
};

export default SelectObjectModalBody;
