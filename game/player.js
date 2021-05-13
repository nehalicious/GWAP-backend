const Player = require('../models/player');

const createPlayer = (name) => {

    const player = new Player({
        name: name,
        points: 0,
        type: "N"
    });

    const player_obj = player.save()
        .then(doc=>{return doc})
        .catch(err=> {return false});

    return player_obj
};

module.exports = {createPlayer};