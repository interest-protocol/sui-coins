import { StylinComponentProps } from '@stylin.js/react';
import { BoxProps } from 'elements/box/box.types';
import { InputHTMLAttributes } from 'react';

export type TextFieldElementProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'translate' | 'height' | 'width' | 'content'
>;

export interface TextFieldProps
  extends StylinComponentProps,
    TextFieldElementProps {
  label?: string;
  supportingText?: string;
  status?: 'error' | 'success' | 'none';
  fieldProps?: BoxProps;
}
