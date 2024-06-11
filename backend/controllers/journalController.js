const Journal = require('../models/Journal');
const { analyzeEmotion } = require('../services/emotionAnalysis');

// Create a new journal
const createJournal = async (req, res) => {
    const { userId, content } = req.body; // Get userId and content from request body

    try {
        const emotion = await analyzeEmotion(content);

        const journal = new Journal({
            userId,
            content,
            emotion
        });

        await journal.save() // Save the journal to the database
        res.status(201).json(journal); // Send a success response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

// Get jounals by user ID
const getJournalsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const journals = await Journal.find({ userId }); // Find journals by userId
        res.status(200).json(journals);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    
};

module.exports = { createJournal, getJournalsByUser };
