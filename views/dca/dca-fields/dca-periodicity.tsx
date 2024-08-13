import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { toPairs } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import useToggleOutside from '@/hooks/use-toggle-outside';
import { ChevronDownSVG } from '@/svg';

import { PERIODICITY } from '../dca.data';
import { DCAForm } from '../dca.types';

const DCAPeriodicity: FC = () => {
  const { control, setValue } = useFormContext<DCAForm>();
  const { id, toggle, state } = useToggleOutside({});

  const periodicity = useWatch({ control, name: 'periodicity' });

  return (
    <Box
      id={id}
      flex="1"
      display="flex"
      position="relative"
      alignItems="stretch"
      flexDirection="column"
    >
      <Button
        px="s"
        py="auto"
        bg="none"
        fontSize="s"
        variant="tonal"
        onClick={toggle}
        height="3.25rem"
        color="onSurface"
        borderRadius="xs"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="outlineVariant"
        SuffixIcon={
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        }
      >
        <Typography
          size="large"
          variant="body"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {PERIODICITY[periodicity] ?? 'Select'}
        </Typography>
      </Button>
      {state && (
        <Box
          as="ul"
          zIndex={1}
          mt="3.5rem"
          width="100%"
          display="flex"
          overflowY="auto"
          borderRadius="xs"
          border="1px solid"
          overflowX="hidden"
          position="absolute"
          alignItems="stretch"
          flexDirection="column"
          borderColor="outlineVariant"
        >
          {toPairs(PERIODICITY).map(([key, value]) => (
            <Button
              key={v4()}
              variant="filled"
              borderRadius="0"
              color="onSurface"
              bg="lowestContainer"
              textTransform="capitalize"
              nHover={{ bg: 'container' }}
              onClick={() => {
                setValue('periodicity', key);
                toggle();
              }}
            >
              <Typography size="large" variant="body" overflow="hidden">
                {value}
              </Typography>
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DCAPeriodicity;
