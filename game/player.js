const Player = require('../models/player');

const createPlayer = (req, res) => {

    const player = new Player({
        name: req.body.name,
        points: 0,
        type: "N"
    });

    player.save()
        .then(doc=>res.send(doc))
        .catch(err=> console.log(err))
};

module.exports = {createPlayer};