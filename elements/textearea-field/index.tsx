import { Box } from '@interest-protocol/ui-kit';
import stylin from '@stylin.js/react';
import { FC, forwardRef, PropsWithRef, RefAttributes } from 'react';

import { ErrorSVG, TickSVG } from '@/svg';

import { TextAreaElementProps, TextareaFieldProps } from './textarea.types';

const TextFieldElement = stylin<TextAreaElementProps & RefAttributes<unknown>>(
  'textarea'
)();

const TextareaField: FC<PropsWithRef<TextareaFieldProps>> = forwardRef(
  (
    {
      label,
      // supportingText,
      fieldProps,
      status,
      ...props
    },
    ref
  ) => {
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
          borderStyle="solid"
          borderWidth="1px"
          borderColor="#76767A"
          {...fieldProps}
        >
          <TextFieldElement
            ref={ref}
            borderRadius="inherit"
            outline="none"
            rows={5}
            border="none"
            width="100%"
            px="1rem"
            py="0.5rem"
            // all="unset"
            fontSize="1rem"
            fontWeight="500"
            lineHeight="1.5rem"
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
    );
  }
);

TextareaField.displayName = 'TextareaField';
export default TextareaField;
