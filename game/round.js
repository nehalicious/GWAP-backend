const Hint = require('../models/hint');
const Round= require('../models/round');


const saveToRound = async (round, hint) => {
    round.hints.push(hint._id);

    let ans =  await round.save()
        .then(doc=> {return doc})
        .catch(err => {return false})

    return ans;
};


const addHint = async (player, round_id, hint_id, hint) => {
    const round = await Round.findById(round_id)
        .then(doc=> {return doc})
        .catch(err=> {console.log(err)});

    const h = new Hint({
        player: player,
        hint: hint.text,
        template: hint_id,
        votes: 0
    });

    const ans =  await h.save()
        .then(async doc=> {
            const r = await saveToRound(round, doc);
            return {doc, r}
        })
        .catch(err => {return false})

    return ans
};

module.exports = { addHint }