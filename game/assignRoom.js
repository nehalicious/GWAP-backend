const Room = require('../models/room');

const assignRandom = () => {

};

const assignSpecific = (id) => {
    Room.findById(id)
        .then()
};

/**
 * Assign user to a room
 * Case 1: User enters a game room id and game hasn't started=> assign to room
 * Case 2: User enters a game room id and game has started=>tell him to go to another room
 * Case 2: User enters a game room id that does not exist => tell him id does not exist
 * Case 3: User does not enter a game room id => assign to next empty room
 */
const assign = (req, res) => {
    if(req.body.hasOwnProperty('roomID')) {
        const room_id = assignSpecific(req.body.roomID);
        res.send(room_id)
    } else {
        const room_id = assignRandom();
        res.send(room_id)
    }
    // const room = new Room({
    //     name: 'XXX',
    //     session: 1
    // });
    // room.save()
    //     .then(doc=>res.send(doc))
    //     .catch(err=> console.log(error))
};

module.exports = {assign};