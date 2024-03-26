import { BoxProps } from '@interest-protocol/ui-kit';
import { StylinComponentProps } from '@stylin.js/react';
import { TextareaHTMLAttributes } from 'react';

export type TextAreaElementProps = Omit<
  TextareaHTMLAttributes<HTMLInputElement>,
  'color' | 'translate' | 'height' | 'width' | 'content'
>;

export interface TextareaFieldProps
  extends StylinComponentProps,
    TextAreaElementProps {
  label?: string;
  supportingText?: string;
  status?: 'error' | 'success' | 'none';
  fieldProps?: BoxProps;
}
