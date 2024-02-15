import { Box, ListItem, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { ChevronRightSVG } from '@/svg';

import { IPoolForm } from '../find-pool.types';

const DEX_LIST = ['Interest Protocol', 'Sui Coins'];

const FindPoolFormSelectDex: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<IPoolForm>();

  const dex = useWatch({ control, name: 'dex' });

  return (
    <Box position="relative">
      <Typography variant="body" size="small">
        Dex
      </Typography>
      <Box
        p="xs"
        mt="xs"
        gap="xs"
        display="flex"
        minWidth="8rem"
        cursor="pointer"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        borderColor="outlineVariant"
        onClick={() => setIsOpen(not)}
      >
        <Typography variant="body" size="medium" flex="1" as="span">
          {dex ?? 'Select DEX'}
        </Typography>
        <Box rotate="90deg">
          <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      </Box>
      {isOpen && (
        <Box
          zIndex={1}
          top="4.5rem"
          width="100%"
          cursor="pointer"
          bg="lowContainer"
          borderRadius="xs"
          position="absolute"
          border="2px solid"
          borderColor="outline"
        >
          {DEX_LIST.map((dexName) => (
            <ListItem
              key={v4()}
              width="100%"
              title={dexName}
              cursor="pointer"
              onClick={() => {
                setValue('dex', dexName);
                setIsOpen(false);
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FindPoolFormSelectDex;
