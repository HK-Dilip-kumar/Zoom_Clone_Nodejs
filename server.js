const express = require('express');
const app = express();
const server = require('http').Server(app);
//socket io is imported this way....
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
app.set('view engine', 'ejs');


//To include the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})



app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected'); //will broadcasr the user who will be connected

    })
})



server.listen(3030);