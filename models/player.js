const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    points: Number,
    type: String
});

module.exports = mongoose.model('Player', playerSchema);