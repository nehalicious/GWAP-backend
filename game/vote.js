const Hint = require('../models/hint');
const Round = require('../models/round');

const saveVote = async (hint_id, round_id) => {
    const hint = await Hint.findById(hint_id);
    const round = await Round.findById(round_id);

    hint.votes = hint.votes + 1;
    round.votes = round.votes + 1;

    await hint.save().then().catch(err=> console.log(err));

    const r= await round.save()
        .then(doc=> {return doc})
        .catch(err=> {return false})

    return {updated_round: r, updated_hint: hint}
};

module.exports = {saveVote}