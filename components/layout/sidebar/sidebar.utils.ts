import { Network } from '@/constants';

import { SIDEBAR_ITEMS } from './sidebar.data';

export const existThisRouteInNetwork = (asPath: string, network: Network) =>
  Boolean(
    SIDEBAR_ITEMS.filter((item) => {
      if (item.accordionList) {
        return item.accordionList.filter(
          (accordionItem) =>
            accordionItem.path == asPath &&
            accordionItem.networks.includes(network)
        ).length;
      }
      return item.path == asPath && item.networks.includes(network);
    }).length
  );
