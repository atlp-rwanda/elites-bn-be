/* eslint-disable import/prefer-default-export */
import cloudinary from '../config/cloudinary';

export const fileUpload = async (req) => {
  let imageUrl = '';
  await cloudinary.uploader.upload(
    req.file.path,
    { folder: 'barefoot_api/profiles' },
    async (err, image) => {
      if (err) {
        throw new Error(err);
      }
      imageUrl = image.url;
    }
  );
  return imageUrl;
};
