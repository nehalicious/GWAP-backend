const Session = require('../models/session');
const Round = require('../models/round');
const Room = require('../models/room');
const Hint = require('../models/hint');


const saveToRound = async (round, hint) => {
    round.hints.push(hint._id);

    let ans =  await round.save()
        .then(doc=> {return doc})
        .catch(err => {return false})

    return ans;
};


const addHint = async (round_id, hint) => {
    const round = await Round.findById(round_id)
        .then(doc=> {return doc})
        .catch(err=> {console.log(err)});

    const h = new Hint({
        hint: hint.text,
        template: hint.template,
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

const addSession = async (room, session_id) => {
    room.sessions.push(session_id);

    const ans = await room.save()
        .then(doc=>{return doc})
        .catch(err => {return false});

    return ans;
};

/**
 * Create a new session for a room
 * @param room_id
 */
const newSession = async (room_id) => {

    let room = await Room.findById(room_id)
        .then(doc=> {return doc})
        .catch(err=> {console.log(err); return false;});

    console.log(room);

    const players = room.players;
    let guesser;
    let narrators = [];

    for (let i =0; i< players.length; i++) {
        if(players[i].type === 'G') {
            guesser =players[i]
        } else {
            narrators.push(players[i])
        }
    }

    const round = new Round({
        hints: [],
        votes: 0
    });

    let r = await round.save()
        .then(doc=> {return doc})
        .catch(err=> console.log(err));

    const session = new Session({
        scene: 'kitchen',
        rounds: [r._id],
        guesser: guesser,
        narrators: narrators,
        guessed: false
    });

    const ans = await session.save()
        .then(async (doc)=> {
            room = await addSession(room, doc._id);
            return {room: room, new_session: doc}
        })
        .catch(err => {return false});

    return ans;
};

module.exports = {newSession, addHint};