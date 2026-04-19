const ImageKit = require("imagekit");

//  Safe initialization
let imagekit;
if (
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT
) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  });
} else {
  console.warn(" ImageKit keys missing! Uploads will not work.");
}

// Upload function
async function uploadFile(file) {
  if (!imagekit) throw new Error("ImageKit is not initialized. Missing keys.");
  if (!file || !file.buffer) throw new Error("Invalid file buffer");

  const base64File = file.buffer.toString("base64");

  const response = await imagekit.upload({
    file: `data:${file.mimetype};base64,${base64File}`,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/songs"
  });

  return { url: response.url };
}

module.exports = { uploadFile };