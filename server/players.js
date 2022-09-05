const rooms = new Map()

const joinRoom = (username, uId, room) => {
    currentPlayers = rooms.get(room)
    updatedPlayers = currentPlayers.push({uId: socket.id, uName: username })
    rooms.set(room, updatedPlayers)
}   

modules.export = { joinRoom }