const Session = require('../models/session');
const Round = require('../models/round');
const Room = require('../models/room');
const Hint = require('../models/hint');


const saveToRound = (round, hint) => {
    round.hints.push(hint._id);

    return round.save()
        .then(doc=> {return doc})
        .catch(err => {return false})
};


const addHint = (round_id, hint) => {
    const round = Round.findById(round_id);

    const h = new Hint({
        hint: hint.text,
        template: hint.template,
        votes: 0
    });

    return h.save()
        .then(doc=> {
            const r = saveToRound(round, doc);
            return {doc, r}
        })
        .catch(err => {return false})
};

const addSession = (room, session_id) => {
    room.sessions.push(session_id);

    return room.save()
        .then(doc=>{return doc})
        .catch(err => {return false})
};

/**
 * Create a new session for a room
 * @param room_id
 */
const newSession = (room_id) => {
    let room = Room.findById(room_id);
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

    const session = new Session({
        scene: 'kitchen',
        rounds: [round],
        guesser: guesser,
        narrators: narrators,
        guessed: false
    });

    return session.save()
        .then(doc=> {
            room = addSession(room, doc._id);
            return {room, doc}
        })
        .catch(err => {return false})
};

module.exports = {newSession, addHint}