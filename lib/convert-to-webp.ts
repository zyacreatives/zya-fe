import imageCompression, { Options } from "browser-image-compression";

export const convertToWebp = async ({
  file,
  options = {
    fileType: "image/webp",
    maxSizeMB: 0.5,
    maxWidthOrHeight: 300,
    useWebWorker: true,
    alwaysKeepResolution: true,
    initialQuality: 1,
  },
}: {
  file: File;
  options?: Options;
}) => {
  const webPFile = await imageCompression(file, options);
  console.log(`CONVERTED TO WEBP!`);
  return webPFile;
};
