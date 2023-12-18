export const getBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      resolve(reader.result?.toString() ?? '');
      reader.abort();
    });
    reader.addEventListener('error', (e) => {
      reject(e);
      reader.abort();
    });
  });
