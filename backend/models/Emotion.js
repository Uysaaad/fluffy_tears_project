import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  emotion: { type: String, required: true },
  illustration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Emotion = mongoose.model("Emotion", emotionSchema);

export default Emotion;
