const rooms = new Map()
rooms.set('123', [])

const joinRoom = (rooms, room, username, socketId) => {
    currentPlayers = rooms.get(room)
    if (!currentPlayers.some(player => player.username === username)) {
        currentPlayers.push({ username, socketId })
    }
}   

module.exports = { rooms, joinRoom }