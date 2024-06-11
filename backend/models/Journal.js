const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Journal schema
const journalSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    emotion: { type: String },
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', journalSchema);