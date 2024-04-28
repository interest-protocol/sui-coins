import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { PlusSVG } from '@/svg';

const CreatePoolButton: FC = () => {
  const { push } = useRouter();

  const gotoCreatePool = () => push(Routes[RoutesEnum.PoolCreate]);

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <Button
          py="s"
          variant="filled"
          onClick={gotoCreatePool}
          SuffixIcon={
            <Box
              ml="m"
              width="1rem"
              height="1rem"
              display="flex"
              justifyContent="center"
            >
              <PlusSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          create pool
        </Button>
      </Box>
      <Box gap="xs" display={['flex', 'flex', 'flex', 'none']}>
        <Button
          isIcon
          width="1.5rem"
          height="1.5rem"
          variant="filled"
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

export default CreatePoolButton;
