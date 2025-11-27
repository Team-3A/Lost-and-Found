import cloudinary from "./config/cloudinary";

export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  try {
    // Convert File to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64"
    )}`;

    console.log(cloudinary);
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "food-images",
    });
    console.log(result);

    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
