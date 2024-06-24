const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", "test-app-doctor");
  uploadData.append("cloud_name", "drdsgok63");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/drdsgok63/image/upload",
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await res.json();
  return data;
};

export default uploadImageToCloudinary;
