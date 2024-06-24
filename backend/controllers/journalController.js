import Journal from "../models/Journal.js";
import {
  runPredictionModel,
  generateIllustration,
} from "../utils/emotionUtils.js";

export const getUserJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.userId });
    res.status(200).json({ success: true, data: journals });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createJournal = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newJournal = new Journal({ user: req.userId, title, content });
    const savedJournal = await newJournal.save();
    res.status(201).json({ success: true, data: savedJournal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedJournal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    await Journal.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const finishJournal = async (req, res) => {
  try {
    const { content } = req.body;
    const emotions = await runPredictionModel(content);
    const imageUrl = await generateIllustration(emotions);
    res.status(200).json({ success: true, data: { emotions, imageUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
