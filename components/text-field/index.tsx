import { Box } from '@interest-protocol/ui-kit';
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

import { TextFieldElementProps, TextFieldProps } from './text-field.types';

const TextFieldElement = stylin<TextFieldElementProps & RefAttributes<unknown>>(
  'input'
)();

const TextField: FC<PropsWithRef<TextFieldProps>> = forwardRef(
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
      <Box>
        {label && (
          <Box
            mb="xs"
            as="label"
            display="block"
            color="#1B1B1F"
            fontWeight="500"
            lineHeight="1rem"
            fontSize="0.75rem"
          >
            {label}
          </Box>
        )}
        <Box
          display="flex"
          borderRadius="xs"
          alignItems="center"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={focus ? 'primary' : 'outline'}
          {...fieldProps}
        >
          <Box
            px="1rem"
            flex="1"
            width="100%"
            height="2.5rem"
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            justifyContent="center"
            mr={status ? '0.5rem' : 'unset'}
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
          <Box
            pt="2xs"
            fontSize="0.75rem"
            color={status === 'error' ? 'error' : '#0000007A'}
          >
            {supportingText}
          </Box>
        )}
      </Box>
    );
  }
);

TextField.displayName = 'TextField';
export * from './text-field.types';
export default TextField;
