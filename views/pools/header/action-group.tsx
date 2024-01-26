import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { PlusSVG, SearchSVG } from '@/svg';

import { ActionGroupProps } from './header.types';

const ActionGroup: FC<ActionGroupProps> = ({ showSearchView }) => {
  const { push } = useRouter();

  const gotoCreatePool = () => push(Routes[RoutesEnum.CreatePool]);

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <TextField
          Prefix={
            <Box height="1.25rem" width="1.25rem">
              <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
            </Box>
          }
          placeholder="Search"
          fieldProps={{
            width: '13rem',
            borderRadius: 'xs',
          }}
        />
        <Button
          py="0.725rem"
          variant="tonal"
          borderRadius="xs"
          bg="#00000016"
          onClick={gotoCreatePool}
          SuffixIcon={
            <Box
              display="flex"
              width="1.25rem"
              height="1.25rem"
              justifyContent="center"
            >
              <PlusSVG maxHeight="1.125rem" maxWidth="1.125rem" width="100%" />
            </Box>
          }
        >
          Find Pool
        </Button>
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} gap="2xs">
        <Button
          isIcon
          variant="tonal"
          height="1.5rem"
          width="1.5rem"
          bg="#00000016"
          onClick={showSearchView}
        >
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        </Button>
        <Button
          isIcon
          variant="tonal"
          height="1.5rem"
          width="1.5rem"
          bg="rgba(0, 0, 0, 0.08)"
          onClick={gotoCreatePool}
        >
          <Box height="1.25rem" width="1.25rem">
            <PlusSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default ActionGroup;
