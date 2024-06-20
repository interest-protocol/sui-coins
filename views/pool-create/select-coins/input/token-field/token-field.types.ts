import { BoxProps } from '@interest-protocol/ui-kit';
import { StylinComponentProps } from '@stylin.js/react';
import { InputHTMLAttributes, ReactNode } from 'react';

export type TokenFieldElementProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'translate' | 'height' | 'width' | 'content'
>;

export interface TokenFieldProps
  extends StylinComponentProps,
    TokenFieldElementProps {
  active?: boolean;
  Balance?: ReactNode;
  activeBg?: string;
  disabled?: boolean;
  Bottom?: ReactNode;
  TokenIcon?: ReactNode;
  fieldProps?: BoxProps;
  ButtonMax?: ReactNode;
  onActivate?: () => void;
  variant?: 'filled' | 'outline';
  status?: 'error' | 'success' | 'none';
}
