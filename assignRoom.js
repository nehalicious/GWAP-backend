const Room = require('./models/room')


const assign = (req, res) => {
    const room = new Room({
        name: 'XXX',
        session: 1
    });
    room.save()
        .then(doc=>res.send(doc))
        .catch(err=> console.log(error))
};

module.exports = {assign};