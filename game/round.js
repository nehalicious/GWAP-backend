const Hint = require('../models/hint');
const Round= require('../models/round');
const Session = require('../models/session');
const mongoose = require('mongoose');

const saveToRound = async (round, hint) => {
    round.hints.push(hint._id);

    let ans =  await round.save()
        .then(doc=> {return doc})
        .catch(err => {return false})

    return ans;
};

const nextRound = async(session_id) => {
    let session = await Session.findById(session_id);

    const round = new Round( {
        hints: [],
        votes: 0
    });

    let r = await round.save()
        .then(doc=> {return doc})
        .catch(err=> console.log(err));

    session.rounds.push(r);

    let saved_session = await session.save().then(doc=> {return doc}).catch(err=> {console.log(err)})

    return ({updated_session: saved_session, new_round: r});
};


const addHint = async (player_id, round_id, hint_id, hint) => {
    // return "hello"
    const round = await Round.findById(round_id)
        .then(doc=> {console.log("found round"); return doc})
        .catch(err=> {console.log(err)});

    console.log(player_id);
    console.log("printed pid")
    // console.log(round_id);
    // console.log(hint_id);
    // console.log(hint);

    const h = new Hint({
        player: player_id,
        hint: hint,
        templateID: hint_id,
        votes: 0
    });

    const ans =  await h.save()
        .then(async doc=> {
            console.log("created hint")
            console.log(doc);
            const r = await saveToRound(round, doc);
            //here doc is the hint, r is the round
            return {doc, r}
        })
        .catch(err => {console.log(err); return false})

    const data = {
        updated_round: ans.r,
        sent_hint: ans.doc
    };

    return data
};

const getMaxHint = async (round_id) => {
    const hints = await Round.findById(round_id)
        .populate("hints")
        .then(doc=>{return doc.hints})
        .catch(err=>console.log(err));

    let maxVoted = hints[0];

    for(let i =0; i<hints.length; i++) {
        if(hints[i].votes> maxVoted.votes) {
            maxVoted = hints[i]
        }
    }

    console.log(maxVoted);

    return maxVoted;
};


module.exports = { addHint, getMaxHint, nextRound };