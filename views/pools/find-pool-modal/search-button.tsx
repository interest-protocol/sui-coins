import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { PoolForm } from '../pools.types';
import { FindPoolModalProps } from './find-pool-modal.types';

const SearchButton: FC<FindPoolModalProps> = ({ closeModal }) => {
  const { setValue } = useFormContext<PoolForm>();
  const handleSearch = () => setValue('isFindingPool', true);

  const handleFindPool = () => {
    handleSearch();
    closeModal();
  };

  return (
    <Button
      display="flex"
      variant="filled"
      minWidth="17rem"
      borderRadius="xs"
      justifyContent="center"
      onClick={handleFindPool}
    >
      Search
    </Button>
  );
};

export default SearchButton;
