const express = require('express');
const journalController = require('../controllers/journalController');

const router = express.Router();

// Routes for creating and fetching journals
router.post('/', journalController.createJournal);
router.get('/:userId', journalController.getJournalsByUser);

module.exports = router;