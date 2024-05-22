import { Box, Button, Motion, RadioButton } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useEffect, useId, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ArrowDownSVG, ArrowUpSVG } from '@/svg';

import { FormFilterValue } from '../../pool-card/pool-card.types';
import { FilterItemProps, PoolForm } from '../../pools.types';
import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({ label, type, filterData, disabled }) => {
  const boxId = useId();
  const { control } = useFormContext<PoolForm>();
  const fields = useWatch({ control, name: 'filterList' });
  const { replace } = useFieldArray({
    control,
    name: 'filterList',
  });

  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<FilterItemProps>({
    type: type,
    value: '' as FormFilterValue,
  });

  const [isSelected, setIsSelected] = useState(false);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == boxId) ||
      event?.composedPath()?.some((node: any) => node?.id == boxId)
    )
      return;

    setOpen(false);
  };

  useEffect(() => {
    const fieldSelected = fields?.filter((field) => field.type == type)[0];
    setSelectedOption({
      type: type,
      value: fieldSelected?.value || '',
    });
  }, [fields]);

  const handleSelect = (option: FilterItemProps) => {
    if (option.value != selectedOption.value) {
      const tmpFilters = fields?.filter(
        (field) => selectedOption.value != field.value
      );
      tmpFilters.push({ ...option });
      setSelectedOption(option);
      setIsSelected(!isSelected);
      replace(tmpFilters);
    }
    setOpen(not);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box id={boxId} position="relative">
      <Box>
        <Button
          py="s"
          my="xs"
          mx={['unset', 'unset', 'unset', 'xs']}
          variant="filled"
          color="onSurface"
          bg={isOpen ? 'onPrimary' : 'surface'}
          width={['fill-available', 'fill-available', 'fill-available', '8rem']}
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
                {filterData.map((value) => (
                  <Box
                    p="l"
                    gap="xs"
                    key={v4()}
                    display="flex"
                    color="onSurface"
                    borderRadius="xs"
                    textTransform="capitalize"
                    justifyContent="space-between"
                    nHover={{ bg: 'lowestContainer' }}
                    onClick={() => handleSelect(value)}
                  >
                    {value.value}
                    <RadioButton
                      defaultValue={selectedOption.value === value.value}
                    />
                  </Box>
                ))}
              </Box>
            </div>
          </Motion>
        )}
      </Box>
    </Box>
  );
};

export default Dropdown;
