import { FC } from 'react';

import { CheckSVG, ExclamationCircleSVG, WarningSVG } from '@/svg';

import { SVGProps } from '../svg/svg.types';

export const COLOR_MAP: Record<string, string> = {
  warning: 'warning',
  info: 'primary',
  success: 'success',
  error: 'error',
};

export const STATUS_ICON: Record<string, FC<SVGProps>> = {
  error: WarningSVG,
  warning: ExclamationCircleSVG,
  info: ExclamationCircleSVG,
  success: CheckSVG,
};
