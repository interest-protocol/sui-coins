import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FindPoolForm, FindPoolModalProps } from './find-pool-modal.types';

const SearchButton: FC<Pick<FindPoolModalProps, 'handleSearch'>> = ({
  handleSearch,
}) => {
  const { control } = useFormContext<FindPoolForm>();
  const { fields } = useFieldArray({
    control,
    name: 'tokens',
  });
  return (
    <Button
      display="flex"
      variant="filled"
      minWidth="17rem"
      borderRadius="xs"
      justifyContent="center"
      onClick={() => handleSearch(fields)}
    >
      Search
    </Button>
  );
};

export default SearchButton;
