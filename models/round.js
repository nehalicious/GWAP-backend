const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    hints: [{ type: Schema.Types.ObjectId, ref: 'Hint' }]
});

module.exports = mongoose.model('Round', roundSchema);