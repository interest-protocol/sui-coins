export const getSuiPlayHoldersJSON = async (
  tier: 'The Mythics' | 'The Exalted' | 'All',
  holders: ReadonlyArray<string>,
  date: number
) => {
  const jsonFile =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(holders, null, 2));

  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', jsonFile);
  linkElement.setAttribute('download', `SuiPlay-${tier}-holders-${date}.json`);
  linkElement.click();
  linkElement.remove();
};
