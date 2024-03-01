import { Box, Button, Motion, RadioButton } from '@interest-protocol/ui-kit';
import { FC, useId, useState } from 'react';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ArrowDownSVG, ArrowUpSVG } from '@/svg';

import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({ label, values, disabled, onSelect }) => {
  const boxId = useId();
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == boxId) ||
      event?.composedPath()?.some((node: any) => node?.id == boxId)
    )
      return;

    setOpen(!false);
  };

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsSelected(!isSelected);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box id={boxId} position="relative">
      <Button
        py="s"
        mx="xs"
        bg="onSurface"
        color="surface"
        minWidth="8rem"
        variant="filled"
        onClick={() => setOpen(!isOpen)}
        nHover={{
          backgroundColor: 'onPrimaryContainer',
        }}
        SuffixIcon={
          <Box display="flex" justifyContent="center">
            {isOpen ? (
              <ArrowDownSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            ) : (
              <ArrowUpSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            )}
          </Box>
        }
      >
        {isSelected ? selectedOption : label}
      </Button>
      {!disabled && isOpen && (
        <Motion
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <div ref={dropdownRef}>
            <Box
              bg="onSurface"
              zIndex="1"
              mx="xs"
              mt="xs"
              display="flex"
              minWidth="15rem"
              position="absolute"
              borderRadius="xs"
              flexDirection="column"
              cursor={disabled ? 'not-allowed' : 'pointer'}
            >
              {values.map((value) => {
                return (
                  <Box
                    p="l"
                    key={v4()}
                    color="surface"
                    display="flex"
                    justifyContent="space-between"
                    borderRadius="xs"
                    onClick={() => handleSelect(value)}
                    nHover={{
                      backgroundColor: 'onPrimaryContainer',
                    }}
                  >
                    {value}
                    {selectedOption === value ? (
                      <RadioButton defaultValue />
                    ) : (
                      <RadioButton />
                    )}
                  </Box>
                );
              })}
            </Box>
          </div>
        </Motion>
      )}
    </Box>
  );
};

export default Dropdown;
