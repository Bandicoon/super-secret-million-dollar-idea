const rooms = new Map()
rooms.set('123', [])

const joinRoom = (rooms, room, username, socketId) => {
    currentPlayers = rooms.get(room);

    if (!currentPlayers) {
        rooms.set(room, [{ username, socketId }]);
        return 0;
    }
    
    if (!currentPlayers.some(player => player.username === username)) {
        currentPlayers.push({ username, socketId })
        return 0;
    } else {
        return -1;
    }
}   

module.exports = { rooms, joinRoom }