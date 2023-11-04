import { SVGAttributes } from 'react';

export interface SVGProps extends SVGAttributes<SVGSVGElement> {
  maxHeight: string;
  maxWidth: string;
}
