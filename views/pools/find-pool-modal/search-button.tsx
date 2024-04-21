import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { CoinData } from '@/interface';

import { PoolForm } from '../pools.types';
import { FindPoolModalProps } from './find-pool-modal.types';

const SearchButton: FC<FindPoolModalProps> = ({ closeModal }) => {
  const { setValue, getValues, control } = useFormContext<PoolForm>();
  const [isError, setError] = useState(false);
  useFieldArray({
    control,
    name: 'tokenList',
    rules: { maxLength: 5 },
  });

  const tokenListData = getValues('tokenList');

  const handleSearch = () => setValue('isFindingPool', true);

  const hasEmptyKeys = (token: [] | readonly CoinData[]) => {
    return token.some((obj) =>
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(obj).some(([key, value]) => !value)
    );
  };

  const handleFindPool = () => {
    const listOfToken = hasEmptyKeys(tokenListData);
    if (!listOfToken) {
      handleSearch();
      closeModal();
    } else {
      setError(true);
      const timeout = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
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
