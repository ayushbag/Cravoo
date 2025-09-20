import ImageKit from "imagekit";
const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;
const imageKit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});
export const uploadFile = async (file, fileName) => {
    const result = await imageKit.upload({
        file: file,
        fileName: fileName
    });
    // returns url of uploaded file
    return result;
};
//# sourceMappingURL=storage.service.js.map