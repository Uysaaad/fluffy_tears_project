import Emotion from "../models/Emotion.js";

export const addEmotion = async (req, res) => {
  const { content, emotion, illustration } = req.body;
  const userId = req.userId;

  try {
    const newEmotion = new Emotion({ userId, text: content, emotion, illustration });
    await newEmotion.save();
    res.status(201).json(newEmotion);
  } catch (err) {
    console.error("Error adding emotion:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getEmotions = async (req, res) => {
  console.log("Fetching emotions, user ID:", req.userId);
  const userId = req.userId; // Use req.userId set by verifyToken middleware

  try {
    const emotions = await Emotion.find({ userId });
    res.status(200).json(emotions);
  } catch (err) {
    console.error("Error fetching emotions:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteEmotion = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting emotion, emotion ID:", id);

  try {
    await Emotion.findByIdAndDelete(id);
    res.status(200).json({ message: "Emotion deleted successfully" });
  } catch (err) {
    console.error("Error deleting emotion:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
