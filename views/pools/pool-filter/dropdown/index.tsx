import {
  Box,
  Button,
  Motion,
  RadioButton,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useEffect, useId, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ArrowDownSVG, ArrowUpSVG } from '@/svg';

import { FilterItemProps, PoolForm } from '../../pools.types';
import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({
  Icon,
  label,
  type,
  filterData,
  disabled,
}) => {
  const { control } = useFormContext<PoolForm>();
  const fields = useWatch({ control, name: 'filterList' });
  const { replace } = useFieldArray({
    control,
    name: 'filterList',
  });

  const boxId = useId();
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<FilterItemProps>({
    type: type,
    description: '',
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
      description: fieldSelected?.description || '',
    });
  }, [fields]);

  const handleSelect = (option: FilterItemProps) => {
    if (option.description != selectedOption.description) {
      const tmpFilters = fields?.filter(
        (field) => selectedOption.description != field.description
      );
      tmpFilters.push({ ...option });
      setSelectedOption(option);
      setIsSelected(!isSelected);
      replace(tmpFilters);
    }
    setOpen(!isOpen);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box id={boxId} position="relative">
      <Box>
        <Button
          py="s"
          variant="filled"
          color="onSurface"
          width={[
            'fill-available',
            '5rem',
            '5rem',
            'fill-available',
            'fill-available',
          ]}
          onClick={() => setOpen(!isOpen)}
          nHover={{
            backgroundColor: 'container',
          }}
          bg={isOpen ? 'onPrimary' : 'surface'}
          PrefixIcon={
            <Box
              justifyContent="center"
              display={['flex', 'flex', 'flex', 'none', 'none']}
            >
              <Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            </Box>
          }
          SuffixIcon={
            <Box display="flex" justifyContent="center">
              {isOpen ? (
                <ArrowDownSVG
                  width="100%"
                  maxWidth="1.5rem"
                  maxHeight="1.5rem"
                />
              ) : (
                <ArrowUpSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              )}
            </Box>
          }
        >
          <Typography
            size="large"
            variant="label"
            display={['none', 'none', 'none', 'block', 'block']}
          >
            {label}
          </Typography>
        </Button>
        {!disabled && isOpen && (
          <Motion
            animate={{ scale: 1 }}
            initial={{ scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={dropdownRef}
            >
              <Box
                mx="2xs"
                my="xs"
                zIndex="1"
                bg="surface"
                display="flex"
                color="onSurface"
                borderRadius="xs"
                border="1px solid"
                position="absolute"
                flexDirection="column"
                borderColor="outlineVariant"
                minWidth={['8rem', '8rem', '8rem', '15rem']}
                cursor={disabled ? 'not-allowed' : 'pointer'}
              >
                {filterData.map((value) => {
                  return (
                    <Box
                      p="l"
                      gap="xs"
                      key={v4()}
                      display="flex"
                      color="onSurface"
                      borderRadius="xs"
                      justifyContent="space-between"
                      onClick={() => handleSelect(value)}
                      nHover={{
                        backgroundColor: 'lowestContainer',
                      }}
                    >
                      {value.description}
                      <RadioButton
                        defaultValue={
                          selectedOption.description === value.description
                        }
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Motion>
        )}
      </Box>
    </Box>
  );
};

export default Dropdown;
