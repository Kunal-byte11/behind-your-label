export const optimizeImage = async (file: File): Promise<File> => {
  const maxSizeMB = 1;
  if (file.size > maxSizeMB * 1024 * 1024) {
    const options = {
      maxSizeMB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    
    const compressedFile = await imageCompression(file, options);
    return new File([compressedFile], file.name, { type: file.type });
  }
  return file;
};