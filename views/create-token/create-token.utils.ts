import Resizer from 'react-image-file-resizer';

export const getBase64 = (file: File) =>
  new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      'JPEG',
      100,
      0,
      (uri) => resolve(uri.toString()),
      'base64'
    );
  });
