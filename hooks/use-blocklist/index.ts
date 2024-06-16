import useSWR from 'swr';

import { OBJECT_GUARDIANS_BLOCKLIST } from '@/components/web3-manager/all-objects-manager/all-objects.data';

export const useBlocklist = () =>
  useSWR<ReadonlyArray<string>>('suiet-guardians', () =>
    fetch('https://guardians.suiet.app/object-list.json')
      .then((response) => response.json?.())
      .then((data) => data.blocklist)
      .catch(() => OBJECT_GUARDIANS_BLOCKLIST)
  );
