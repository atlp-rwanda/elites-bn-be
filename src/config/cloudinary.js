import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_API_KEY,
  // api_secret: process.env.CLOUD_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
});

export default cloudinary;
