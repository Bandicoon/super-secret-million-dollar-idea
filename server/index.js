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
