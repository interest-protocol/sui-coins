import { TokenIconProps, TypeBasedIcon } from './token-icon.types';

export const isTypeBased = (props: TokenIconProps): props is TypeBasedIcon =>
  !!(props as TypeBasedIcon).type;
