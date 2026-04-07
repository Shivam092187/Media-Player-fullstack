const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file) {
  if (!file || !file.buffer) throw new Error("Invalid file buffer");

  const base64File = file.buffer.toString("base64");

  const response = await imagekit.upload({
    file: `data:${file.mimetype};base64,${base64File}`, // ✅ FIX
    fileName: Date.now() + "-" + file.originalname,
    folder: "/songs"
  });

  return { url: response.url };
}

module.exports = { uploadFile };