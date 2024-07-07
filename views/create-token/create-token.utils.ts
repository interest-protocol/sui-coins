import Resizer from 'react-image-file-resizer';

import { Quest } from '@/server/model/quest';

export const getBase64 = async (file: File) => {
  const stringImage = await new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      'JPEG',
      80,
      0,
      (uri) => resolve(uri.toString()),
      'base64'
    );
  });

  if (stringImage.length >= 80_000) throw new Error('Image is too big');

  return stringImage;
};

export const logCreateToken = (
  address: string,
  symbol: string,
  amount: string,
  txDigest: string
) => {
  fetch('/api/v1/quest/create-token', {
    method: 'POST',
    headers: {
      Origin: 'https://dashboard.galxe.com',
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'createToken',
      data: {
        coin: {
          amount,
          type: '',
          symbol: symbol,
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });
};
