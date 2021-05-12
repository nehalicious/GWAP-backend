const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    scene: String,
    rounds: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
    guesser: { type: Schema.Types.ObjectId, ref: 'Player' },
    narrators: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    guessed: Boolean
});

module.exports = mongoose.model('Session', sessionSchema);