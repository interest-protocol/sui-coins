import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { wrapperVariants } from '@/constants';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { BNBSVG, ChevronRightSVG } from '@/svg';

import { InputProps as DropdownTokenProps } from '../input.types';
import DropdownTokenItem from './item';

const BOX_ID = 'dropdown-box-id';

const DropdownToken: FC<DropdownTokenProps> = ({ label, formSwap }) => {
  const [isOpen, setIsOpen] = useState(false);

  const token = useWatch({
    control: formSwap.control,
    name: label,
  });

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setIsOpen(false);
  };

  const networkBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box
      position="relative"
      id={BOX_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={networkBoxRef}
    >
      <Button
        variant="tonal"
        fontSize="0.875rem"
        pl="0.5rem"
        pr="1rem"
        onClick={() => setIsOpen(not)}
        PrefixIcon={
          <Box
            minWidth="1.5rem"
            width="1.5rem"
            height="1.5rem"
            bg="#000"
            color="#fff"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            position="relative"
          >
            <BNBSVG maxWidth="1.125rem" maxHeight="1.125rem" width="100%" />
          </Box>
        }
        SuffixIcon={
          <Box minWidth="1rem">
            <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Box>
        }
      >
        {token.symbol}
      </Button>
      {isOpen && (
        <Motion
          top="3rem"
          zIndex={4}
          width="14.5rem"
          initial="closed"
          maxHeight="15rem"
          overflowY="auto"
          border="1px solid"
          borderRadius="1rem"
          position="absolute"
          bg="lowestContainer"
          variants={wrapperVariants}
          textTransform="capitalize"
          borderColor="outlineVariant"
          animate={isOpen ? 'open' : 'closed'}
          pointerEvents={isOpen ? 'auto' : 'none'}
          boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12)"
        >
          <DropdownTokenItem />
          <DropdownTokenItem />
          <DropdownTokenItem />
          <DropdownTokenItem />
        </Motion>
      )}
    </Box>
  );
};

export default DropdownToken;
