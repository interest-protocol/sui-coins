import { Box, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ChevronDownSVG } from '@/svg';

import { CreatePoolForm } from '../pool-create.types';
import PoolCreateButton from '../pool-create-button';
import { DATA } from './select-dex.data';

const BOX_ID = 'select-dex';

enum DexName {
  Interest = 'interest',
}

const DEX_MAP = {
  [DexName.Interest]: { name: 'Interest' },
};

const SelectDex: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<CreatePoolForm>();
  const dex = useWatch({ control, name: 'dex' });

  const closeNetworkDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(not);
  };

  const selectDexBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeNetworkDropdown);

  return (
    <>
      <Box my="xl">
        <Box
          p="2xl"
          mx="auto"
          gap="2rem"
          maxWidth="33rem"
          borderRadius="xs"
          bg="lowestContainer"
        >
          <Typography variant="body" size="large" color="onSurface">
            Select Dex
          </Typography>
          <Box display="grid" gap="s" my="s" id={BOX_ID}>
            <Box
              px="m"
              py="xs"
              width="100%"
              display="flex"
              cursor="pointer"
              color="onSurface"
              borderRadius="xs"
              defaultValue={dex}
              border="1px solid"
              position="relative"
              alignItems="center"
              onClick={toggleMenu}
              borderColor="outlineVariant"
              justifyContent="space-between"
            >
              <Typography size="large" variant="body">
                {dex ? DEX_MAP[dex as DexName].name : 'Select DEX'}
              </Typography>
              <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              {isOpen && (
                <Box
                  zIndex={2}
                  top="3rem"
                  mx="-1rem"
                  width="100%"
                  overflow="hidden"
                  borderRadius="xs"
                  border="1px solid"
                  position="absolute"
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ref={selectDexBoxRef}
                  borderColor="outlineVariant"
                >
                  {DATA.map(({ title, value }) => (
                    <Box
                      px="m"
                      py="s"
                      key={v4()}
                      bg="surface"
                      nHover={{ bg: 'container' }}
                      onClick={() => setValue('dex', value)}
                    >
                      {title}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <PoolCreateButton />
    </>
  );
};

export default SelectDex;
