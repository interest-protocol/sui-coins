import { SUIPLAY_HOLDERS } from '@/constants/nft';

export const getSuiPlayHoldersJSON = async (
  tier: 'The Mythics' | 'The Exalted' | 'All',
  date: number
) => {
  const jsonFile =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(SUIPLAY_HOLDERS[tier], null, 2));

  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', jsonFile);
  linkElement.setAttribute('download', `SuiPlay-${tier}-holders-${date}.json`);
  linkElement.click();
  linkElement.remove();
};
