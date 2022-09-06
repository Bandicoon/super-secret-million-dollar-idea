const cors = require('cors');
// Set up express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));

var rooms = new Map()

const { joinRoom } = require('./players.js');

const generateRoom = () => {
    var result = '';
    var hexChars = '0123456789abcdef';
    for (var i = 0; i < 16; i += 1) {
        result += hexChars[Math.floor(Math.random() * 16)];
    }
    return result;
}

io.on('connection', (socket) => {
    socket.on('createRoom', (username) => {
        const room = generateRoom();
        socket.join(room);
        joinRoom(username, socket.id, room);
    })

    socket.on('joinRoom', ({username, room}) => {
        if (username == '' || room == '') {
            socket.emit('joinError');
        }

        if (rooms.has(room)) {
            socket.join(room);
            joinRoom(room, username, socket.id);
            if (rooms.get(room).length == 2) {
                io.to(room).emit('gameStarting');
            }
            socket.emit('joinSucesss');
            io.to(room).emit('newPlayerJoined');
        } else {
            socket.emit('joinError');
        }
    })
})