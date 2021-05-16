const Player = require('../models/player');
const Room = require('../models/room');

let last_room_id = null;

const getRoom = async (room_id) => {
    const room = await Room.findById(room_id)
        .then(doc=> {return doc})
        .catch(err=> {console.log(err); return false})

    return room
};

/**
 * Create a room and add player to it
 * @param player_id: player to be added
 * @returns {Promise<T | boolean>}
 * If room is created, return room, else return false
 */
const createRoom  = async (player_id) => {
    const room = new Room({
        players: [player_id],
        sessions: [],
        started: false
    });

    const ans = await room.save()
        .then(doc => {
            last_room_id = doc._id;
            return doc;
        })
        .catch(error => {
            return false
        });
    return ans
};

/**
 * Add player to the last room as it has space
 * @param player_id: player to be added
 * @returns {Promise<T | boolean>}
 * Returns room if successfully saved, else returns false
 */
const addToRoom = async (player_id) => {
    const room = await getRoom(last_room_id);
    room.players.push(player_id);

    const ans = await room.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            return false
        });
    return ans;
};

/**
 * Get room to which player belongs
 * @param player_id: Player to be added to room
 * @returns {Promise<T|boolean>}
 * Returns room if successfully created and found room,
 * else returns false
 */
const assignRoom = async (player_id) => {
    let last_room = await getRoom(last_room_id);
    let room;
    if(last_room_id === null || last_room.players.length === 4) {
        room = await createRoom(player_id)
    } else {
        room = await addToRoom(player_id)
    }
    return room;
};

const getType = async () => {
    let last_room = await getRoom(last_room_id);
    if(last_room_id === null) {
        return 'N';
    } else if(last_room.players.length === 3) {
        return 'G'
    } else if(last_room.players.length < 3) {
        return 'N'
    } else {
        return 'N'
    }
};

/**
 * Create a new player and assign him to a room
 * @param name: Name of the player to be added
 * @returns {{player_obj: Promise<T | boolean>, room: Promise<T|boolean>}}
 */
const createPlayer = async (name) => {

    const player = new Player({
        name: name,
        points: 0,
        type: await getType()
    });

    const player_obj = await player.save()
        .then(doc=>{
            return doc
        })
        .catch(err=> {
            return false
        });

    let room;

    if(player_obj) {
        room = await assignRoom(player_obj._id)
    }

    return {player_obj, room}
};



module.exports = {createPlayer};