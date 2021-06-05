const Session = require('../models/session');
const Round = require('../models/round');
const Room = require('../models/room');

const sessions = [
    ['park', 'garden', 'bathroom', 'living room'],
    [ 'bedroom', 'amusement park', 'kitchen', 'church'],
    ['cafe', 'hotel', 'club', 'classroom'],
    ['library', 'bank', 'market', 'restaurant']
];

const getRandomScene = (index) => {
    let group = sessions[Math.floor(Math.random() * sessions.length)]
    return group[index];
};
// const session_scenes = ['park', 'garden', 'bathroom', 'living room', 'bedroom', 'amusement park', 'kitchen'];

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
        .populate("players")
        .then(doc=> {return doc})
        .catch(err=> {console.log(err); return false;});

    if(room.sessions.length === 1) {
        return {updated_room: room, new_session: false}
    }

    console.log(room);

    const players = room.players;
    let guesser;
    let narrators = [];

    for (let i =0; i< players.length; i++) {
        if(players[i].type === "G") {
            guesser = players[i]._id
        } else {
            narrators.push(players[i])
        }
    }

    const round = new Round({
        hints: [],
        votes: 0,
        weight: 10
    });

    let r = await round.save()
        .then(doc=> {return doc})
        .catch(err=> console.log(err));

    const session = new Session({
        scene: getRandomScene(room.sessions.length),
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

const setCorrect = async (session_id) => {
    let session = await Session.findById(session_id);
    session.guessed = true;
    const sess = await session.save().then(doc=>{console.log(doc); return doc}).catch(err=>{console.log(err)});
    return sess;
};

module.exports = {newSession, setCorrect};