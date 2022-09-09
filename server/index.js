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

    socket.on('createRoom', ({username}) => {
        const room = generateRoom();
        socket.join(room);
        joinRoom(rooms, room, username, socket.id);
        socket.emit('joinSuccess', {room, players: rooms.get(room)});
        console.log(rooms);
    })

    socket.on('joinRoom', ({username, room}, callback) => {
        console.log(username, room)
        if (username === '' || room === '') {
            callback('Please enter username and room ID')
            return;
        }

        if (rooms.has(room)) {
            if (joinRoom(rooms, room, username, socket.id) === -1) {
                callback('Username already exists');
                return;
            };
            socket.join(room);
            socket.emit('joinSuccess', {room, players: rooms.get(room)});
            io.to(room).emit('newPlayerJoined', {room, players: rooms.get(room)});
            if (rooms.get(room).length == 2) {
                io.to(room).emit('gameStarting');
            }
        } else {
            callback('Room does not exist');
        }
    })
})

server.listen(PORT, () => console.log('server is up and running'))