export const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
export const url = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;
