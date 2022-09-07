const cors = require('cors');
// Set up express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(cors());

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));

const { rooms, joinRoom } = require('./players.js');

const generateRoom = () => {
    var result = '';
    var hexChars = '0123456789abcdef';
    for (var i = 0; i < 16; i += 1) {
        result += hexChars[Math.floor(Math.random() * 16)];
    }
    return result;
}

io.on('connection', (socket) => {
    console.log(`${socket.id} has connected`)

    socket.on('createRoom', (username) => {
        const room = generateRoom();
        socket.join(room);
        joinRoom(rooms, room, username, socket.id);
    })
5
    socket.on('joinRoom', ({username, room}, callback) => {
        console.log(username, room)
        if (username === '' || room === '') {
            callback('Please enter username and room ID')
        }

        if (rooms.has(room)) {
            socket.join(room);
            joinRoom(rooms, room, username, socket.id);
            console.log(rooms);
            io.to(room).emit('joinSuccess', rooms.get(room));
            if (rooms.get(room).length == 2) {
                io.to(room).emit('gameStarting');
            }
        } else {
            socket.emit('joinError');
        }
    })
})

server.listen(PORT, () => console.log('server is up and running'))