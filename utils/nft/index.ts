export const getHoldersJSON = async (
  id: string,
  name: string,
  date: number
) => {
  const nfts = await fetch(`/api/auth/v1/nft-collection?id=${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());

  const jsonFile =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(nfts.holders, null, 2));

  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', jsonFile);
  linkElement.setAttribute('download', `${name}-holders-${date}.json`);
  linkElement.click();
  linkElement.remove();
};
