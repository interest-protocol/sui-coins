import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SearchSVG, TimesSVG } from '@/svg';

import { SearchMobileProps } from './header.types';

const SearchMobile: FC<SearchMobileProps> = ({
  handleClose,
  showSearchView,
}) => {
  return (
    <Box
      gap="m"
      width="100%"
      display={showSearchView ? ['flex', 'flex', 'flex', 'none'] : 'none'}
    >
      <TextField
        fontFamily="Proto"
        fontSize="0.875rem"
        placeholder="FIND POOL"
        fieldProps={{
          border: 'none',
          width: '10.7rem',
          borderRadius: 'xs',
          color: 'onSurface',
          bg: 'highestContainer',
        }}
        Suffix={
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        }
      />
      <Button
        isIcon
        my="auto"
        color="black"
        display="flex"
        width="1.5rem"
        bg="onSurface"
        height="1.5rem"
        variant="filled"
        onClick={handleClose}
        nHover={{
          backgroundColor: 'outline',
        }}
      >
        <Box
          width="1rem"
          height="1rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TimesSVG maxHeight="0.8rem" maxWidth="0.8rem" width="100%" />
        </Box>
      </Button>
    </Box>
  );
};

export default SearchMobile;
