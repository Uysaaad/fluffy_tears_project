import mongoose from "mongoose";

const EmotionGallerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  emotions: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const EmotionGallery = mongoose.model("EmotionGallery", EmotionGallerySchema);
export default EmotionGallery;
