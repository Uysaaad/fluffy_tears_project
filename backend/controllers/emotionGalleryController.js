import EmotionGallery from "../models/EmotionGallery.js";

export const getUserEmotionGallery = async (req, res) => {
  try {
    const galleryItems = await EmotionGallery.find({ user: req.userId });
    res.status(200).json({ success: true, data: galleryItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addEmotionGalleryItem = async (req, res) => {
  try {
    const { title, imageUrl, emotions } = req.body;
    const newGalleryItem = new EmotionGallery({
      user: req.userId,
      title,
      imageUrl,
      emotions,
    });
    const savedGalleryItem = await newGalleryItem.save();
    res.status(201).json({ success: true, data: savedGalleryItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteEmotionGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await EmotionGallery.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
