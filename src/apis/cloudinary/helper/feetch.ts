import { url, uploadPreset } from "../cloudinary";

export const uploadCloudinary = async (file: File) => {
  if (!file) return null;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  console.log(url, uploadPreset);
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  console.log("response", response);
  const data = await response.json();
  return data;
};

export const multipleUploadCloudinary = async (files: File[]) => {
  const promises = [];
  for (const file of files) {
    promises.push(uploadCloudinary(file));
  }
  const results = await Promise.all(promises);

  const urls = results.map((result) => {
    return result.secure_url;
  });
  return urls;
};
