const Hint = require('../models/hint');
const Round = require('../models/round');

const saveVote = (hint_id, round_id) => {
    const hint = Hint.findById(hint_id);
    const round = Round.findById(round_id);

    hint.votes = hint.votes + 1;
    round.votes = round.votes + 1;

    hint.save().then().catch(err=> console.log(err))
    return round.save()
        .then(doc=> {return doc})
        .catch(err=> {return false})
};

module.exports = {saveVote}