const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hintSchema = new Schema({
    player: String,
    hint: String,
    templateID: Number,
    votes: Number
});

module.exports = mongoose.model('Hint', hintSchema);