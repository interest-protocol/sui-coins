import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { PoolForm } from '../pools.types';
import { FindPoolModalProps } from './find-pool-modal.types';

const SearchButton: FC<FindPoolModalProps> = ({ closeModal }) => {
  const { setValue, getValues } = useFormContext<PoolForm>();
  const [isError, setError] = useState(false);

  const handleSearch = () => setValue('isFindingPool', true);

  const handleFindPool = async () => {
    const tokenListData = getValues('tokenList');

    if (tokenListData.every(({ type }) => type)) {
      handleSearch();
      closeModal();
      return;
    }

    setError(true);

    const timeout = setTimeout(() => {
      setError(false);
      clearTimeout(timeout);
    }, 3000);

    return;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {isError && (
        <Typography
          p="2xs"
          color="error"
          size="medium"
          variant="body"
          textAlign="center"
        >
          Token cannot be empty, please select a token
        </Typography>
      )}
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
    </Box>
  );
};

export default SearchButton;
