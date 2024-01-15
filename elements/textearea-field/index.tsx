import { Box, Typography } from '@interest-protocol/ui-kit';
import stylin from '@stylin.js/react';
import { FC, forwardRef, PropsWithRef, RefAttributes } from 'react';

import { ErrorSVG, TickSVG } from '@/svg';

import { TextAreaElementProps, TextareaFieldProps } from './textarea.types';

const TextFieldElement = stylin<TextAreaElementProps & RefAttributes<unknown>>(
  'textarea'
)();

const TextareaField: FC<PropsWithRef<TextareaFieldProps>> = forwardRef(
  ({ label, fieldProps, status, ...props }, ref) => (
    <Box>
      {label && (
        <Typography
          mb="xs"
          as="label"
          size="large"
          variant="body"
          color="onSurface"
        >
          {label}
        </Typography>
      )}
      <Box
        display="flex"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        borderColor="outlineVariant"
        {...fieldProps}
      >
        <TextFieldElement
          ref={ref}
          px="m"
          py="xs"
          rows={5}
          width="100%"
          fontSize="m"
          border="none"
          outline="none"
          lineHeight="m"
          fontWeight="500"
          borderRadius="inherit"
          {...props}
        />
      </Box>
      {(status == 'error' && (
        <Box p="s" display="flex">
          <ErrorSVG
            width="100%"
            height="100%"
            maxWidth="1.25rem"
            maxHeight="1.25rem"
          />
        </Box>
      )) ||
        (status == 'success' && (
          <Box p="s" display="flex">
            <TickSVG
              width="100%"
              height="100%"
              maxWidth="1.25rem"
              maxHeight="1.25rem"
            />
          </Box>
        ))}
    </Box>
  )
);

TextareaField.displayName = 'TextareaField';
export default TextareaField;
