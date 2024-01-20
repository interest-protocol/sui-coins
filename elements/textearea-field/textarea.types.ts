import { StylinComponentProps } from '@stylin.js/react';
import { BoxProps } from 'elements/box/box.types';
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
