const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    points: Number,
    type: String
});

const hintSchema = new Schema({
    hint: String,
    templateID: Number,
    votes: Number
});

const roundSchema = new Schema({
    hints: [hintSchema]
});

const sessionSchema = new Schema({
    scene: String,
    rounds: [roundSchema],
    guesser: playerSchema,
    narrators: [playerSchema],
    guessed: Boolean
});

const roomSchema = new Schema({
    players: [playerSchema],
    sessions: [sessionSchema],
    started: Boolean
});

module.exports = mongoose.model('Room', roomSchema);
module.exports = mongoose.model('Player', playerSchema);