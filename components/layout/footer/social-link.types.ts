import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export type SocialLinkProps = {
  pathname: string;
  title: string;
  Icon: FC<SVGProps>;
};
