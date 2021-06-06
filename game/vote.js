const Hint = require('../models/hint');
const Round = require('../models/round');
const Player = require('../models/player')

const saveVote = async (hint_id, round_id) => {
    const hint = await Hint.findById(hint_id);
    const round = await Round.findById(round_id);
    const player = await Player.findById(hint.player.toString());

    hint.votes = hint.votes + round.weight;
    round.votes = round.votes + 1;
    player.points = player.points + round.weight;

    await hint.save().then().catch(err=> console.log(err));

    await player.save().then().catch(err=> console.log(err));

    const r= await round.save()
        .then(doc=> {return doc})
        .catch(err=> {return false});

    return {updated_round: r, updated_hint: hint}
};

module.exports = {saveVote};