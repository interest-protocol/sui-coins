import stylin from '@stylin.js/react';
import { forwardRef, PropsWithChildren } from 'react';

import { TypographyElementProps, TypographyProps } from './typography.types';

const Typography = forwardRef(
  ({ as, ...props }: PropsWithChildren<TypographyProps>, ref) => {
    const TypographyElement = stylin<TypographyElementProps>(as || 'p')();

    return <TypographyElement ref={ref} {...props} />;
  }
);

Typography.displayName = 'Typography';

export default Typography;
