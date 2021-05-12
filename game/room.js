const Room = require('../models/room');
const Player = require('../models/player');

const createRoom = (req, res) => {
    const room = new Room({
        players: [req.body.player_id],
        sessions: [],
        started: false
    });
    // const room = new Room({
    //     name: req.body.name
    // })

    room.save()
        .then(doc=>res.send(doc))
        .catch(error=>console.log(error))
};

const addToRoom = async (req, res) => {
    const room = await Room.findById(req.body.room_id);
    room.players.push(req.body.player_id);

    room.save()
        .then(doc=>res.send(doc))
        .catch(err => console.log(err))
};

const start = (req, res) => {

};

module.exports = {createRoom, addToRoom, start};