import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { FindSVG, SearchSVG } from '@/svg';

import { ActionGroupProps } from './header.types';

const ActionGroup: FC<ActionGroupProps> = ({ showSearchView }) => {
  const { push } = useRouter();

  // TODO: Change this route to findPool when this page will be created
  const gotoFindPool = () => push(Routes[RoutesEnum.Pools]);

  return (
    <>
      <Box
        gap="s"
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
          }}
        />
        <Button
          py="s"
          variant="filled"
          onClick={gotoFindPool}
          SuffixIcon={
            <Box
              display="flex"
              width="1.25rem"
              height="1.25rem"
              justifyContent="center"
            >
              <FindSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          Find Pool
        </Button>
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} gap="xs">
        <Button
          isIcon
          width="1.5rem"
          variant="filled"
          height="1.5rem"
          onClick={showSearchView}
        >
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        </Button>
        <Button
          isIcon
          width="1.5rem"
          height="1.5rem"
          variant="filled"
          onClick={gotoFindPool}
        >
          <Box height="1.25rem" width="1.25rem">
            <FindSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default ActionGroup;
