import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useId, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { wrapperVariants } from '@/constants';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ChevronDownSVG, ClockSVG } from '@/svg';

import { DCAForm, Period } from '../dca.types';

const DCAPeriodicityDropdown: FC = () => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<DCAForm>();

  const periodicity = useWatch({ control, name: 'settings.periodicity' });

  const closeNetworkDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == id) ||
      event?.composedPath()?.some((node: any) => node?.id == id)
    )
      return;

    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(not);

  const boxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeNetworkDropdown);

  return (
    <Box
      id={id}
      flex="1"
      position="relative"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={boxRef}
    >
      <Box
        px="xs"
        width="100%"
        display="flex"
        height="3.2rem"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        onClick={toggleMenu}
        borderColor="outlineVariant"
        justifyContent="space-between"
      >
        <ClockSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
        <Typography variant="body" size="medium" textTransform="capitalize">
          {periodicity}
        </Typography>
        <ChevronDownSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
      </Box>
      {isOpen && (
        <Motion
          left="0"
          zIndex={4}
          top="3.5rem"
          width="100%"
          borderRadius="xs"
          initial="closed"
          overflow="hidden"
          border="1px solid"
          position="absolute"
          bg="lowestContainer"
          variants={wrapperVariants}
          textTransform="capitalize"
          borderColor="outlineVariant"
          animate={isOpen ? 'open' : 'closed'}
          pointerEvents={isOpen ? 'auto' : 'none'}
          boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
        >
          {['second', 'minute', 'hour', 'day', 'week', 'month'].map(
            (period) => (
              <Box
                px="m"
                py="xs"
                key={v4()}
                display="flex"
                cursor="pointer"
                nHover={{ bg: 'container' }}
                justifyContent="space-between"
                onClick={() => {
                  setValue('settings.periodicity', period as Period);
                  toggleMenu();
                }}
              >
                <Typography variant="body" size="medium">
                  {period}
                </Typography>
              </Box>
            )
          )}
        </Motion>
      )}
    </Box>
  );
};

export default DCAPeriodicityDropdown;
