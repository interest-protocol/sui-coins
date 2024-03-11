import { Box, Button, Motion, RadioButton } from '@interest-protocol/ui-kit';
import { FC, useId, useState } from 'react';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ArrowDownSVG, ArrowUpSVG } from '@/svg';

import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({ label, values, disabled, onSelect }) => {
  const boxId = useId();
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
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
    setOpen(!isOpen);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box id={boxId} position="relative">
      <Box>
        <Button
          py="s"
          m="xs"
          variant="filled"
          color="onSurface"
          bg={selectedOption ? 'onPrimary' : 'surface'}
          width={['20rem', '30rem', '40rem', '8rem']}
          onClick={() => setOpen(!isOpen)}
          nHover={{
            backgroundColor: 'container',
          }}
          SuffixIcon={
            <Box display="flex" justifyContent="center">
              {isOpen ? (
                <ArrowDownSVG
                  maxWidth="1.5rem"
                  maxHeight="1.5rem"
                  width="100%"
                />
              ) : (
                <ArrowUpSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              )}
            </Box>
          }
        >
          {label}
        </Button>
        {!disabled && isOpen && (
          <Motion
            animate={{ scale: 1 }}
            initial={{ scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={dropdownRef}>
              <Box
                mx="s"
                my="xs"
                zIndex="1"
                bg="surface"
                color="onSurface"
                display="flex"
                minWidth={['8rem', '8rem', '8rem', '15rem']}
                position="absolute"
                borderRadius="xs"
                flexDirection="column"
                cursor={disabled ? 'not-allowed' : 'pointer'}
              >
                {values.map((value) => {
                  return (
                    <Box
                      p="l"
                      gap="xs"
                      key={v4()}
                      color="onSurface"
                      display="flex"
                      justifyContent="space-between"
                      borderRadius="xs"
                      onClick={() => handleSelect(value)}
                      nHover={{
                        backgroundColor: 'lowestContainer',
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
    </Box>
  );
};

export default Dropdown;
