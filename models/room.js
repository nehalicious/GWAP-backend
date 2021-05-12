const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    players:  [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
    started: Boolean
});

module.exports = mongoose.model('Room', roomSchema);