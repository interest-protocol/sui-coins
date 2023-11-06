import stylin from '@stylin.js/react';
import {
  ChangeEvent,
  FC,
  FocusEvent,
  forwardRef,
  PropsWithRef,
  RefAttributes,
  useState,
} from 'react';

import { ErrorSVG, TickSVG } from '@/svg';

import { Box, Typography } from '../../elements';
import { TextFieldElementProps, TextFieldProps } from './text-field.types';

const TextFieldElement = stylin<TextFieldElementProps & RefAttributes<unknown>>(
  'input'
)();

export const TextField: FC<PropsWithRef<TextFieldProps>> = forwardRef(
  (
    { supportingText, status, onBlur, onFocus, fieldProps, label, ...props },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState<string>();

    const statusColor = status || 'onSurface';
    const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
      if (!focus) setFocus(true);

      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      if (focus) setFocus(false);

      onBlur?.(e);
    };

    const changeValue = (input: string) => setValue(input);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      changeValue(e.target.value);

    return (
      <Box color={statusColor}>
        <Typography
          mb="0.5rem"
          fontSize="0.75rem"
          fontWeight="500"
          lineHeight="1rem"
          color="#1B1B1F"
        >
          {label}
        </Typography>
        <Box
          p="xs"
          display="flex"
          borderRadius="0.5rem"
          alignItems="center"
          borderStyle="solid"
          borderWidth="1px"
          borderColor="#76767A"
          {...fieldProps}
        >
          <Box
            m="xs"
            px="1rem"
            mr={status ? '0.5rem' : 'unset'}
            flex="1"
            width="100%"
            height="2.5rem"
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            justifyContent="center"
          >
            <TextFieldElement
              ref={ref}
              all="unset"
              type="text"
              width="100%"
              fontSize="1rem"
              fontWeight="500"
              lineHeight="1.5rem"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={focus}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
              color={statusColor}
              defaultValue={value || props.defaultValue}
              nPlaceholder={{
                color: 'onSurface',
              }}
              {...props}
            />
          </Box>
          {(status == 'error' && (
            <Box p="0.5rem" display="flex">
              <ErrorSVG
                width="100%"
                height="100%"
                maxWidth="1.25rem"
                maxHeight="1.25rem"
              />
            </Box>
          )) ||
            (status == 'success' && (
              <Box p="0.5rem" display="flex">
                <TickSVG
                  width="100%"
                  height="100%"
                  maxWidth="1.25rem"
                  maxHeight="1.25rem"
                />
              </Box>
            ))}
        </Box>
        {supportingText && (
          <Typography pt="0.5rem" fontSize="0.75rem" color="#0000007A">
            {supportingText}
          </Typography>
        )}
      </Box>
    );
  }
);

TextField.displayName = 'TextField';
export * from './text-field.types';
