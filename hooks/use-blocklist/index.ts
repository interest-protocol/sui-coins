import useSWR from 'swr';

import {
  COIN_GUARDIANS_BLOCKLIST,
  OBJECT_GUARDIANS_BLOCKLIST,
} from '@/constants/guardians';

export const useBlocklist = () =>
  useSWR<ReadonlyArray<string>>('suiet-guardians', () =>
    Promise.all([
      fetch('https://guardians.suiet.app/object-list.json')
        .then((response) => response.json?.())
        .then((data) => data.blocklist)
        .catch(() => OBJECT_GUARDIANS_BLOCKLIST),
      fetch('https://guardians.suiet.app/coin-list.json')
        .then((response) => response.json?.())
        .then((data) => data.blocklist)
        .catch(() => COIN_GUARDIANS_BLOCKLIST),
    ]).then((response) => response.flat())
  );
