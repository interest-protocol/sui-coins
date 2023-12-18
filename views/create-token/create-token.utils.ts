import Resizer from 'react-image-file-resizer';

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
