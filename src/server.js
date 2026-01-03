// tcpServer.js
import net from "net";

const server = net.createServer();

const room = {}

let globalRommId = 1

const generateRoomId = () => {
  return globalRommId++
}

server.on('connection', (conn) => {
  conn.on('data', (data) => {
    const message = data.toString()
    if(!conn.id) {
      // for no name (first time)
      conn.id = message
      conn.write(
        'name configured!\n' +
        'if you want to join a room type "join X" where X is roomId else type "create"\n'
      )
    } else if (!conn.roomId) {
      // for not in room
      if (message.startsWith("join")) {
        // for joining room
        let roomId = message.split(" ")[1]
        if (!(roomId in room)) {
          conn.write("room not exists! \n")
        } else {
          room[roomId].push(conn)
          conn.write('room joined! \n')
          conn.roomId = roomId
        }
      } else if(message == "create"){
        // for creating room (initially)
        let roomId = generateRoomId()
        room[roomId] = [conn]
        conn.roomId = roomId
        conn.write(`room created with id : ${roomId}, share it with your friends \n`)
      }
    } else {
      // for sending message to the room members
      const curRoom = room[conn.roomId]
      curRoom.forEach(i => {
        if (conn != i && i.id) {
          i.write(`${conn.id}: ${data.toString()}`);
        } 
      })
    }
  });
  conn.on('close', () => {
    // to remove the conn from the room (cleanup)
    const currentRoomId = conn.roomId
    if (currentRoomId) {
      //removing conn from it's room 
      room[currentRoomId] = room[currentRoomId].filter(i => i != conn)
      // deleting the room incase it doesnt contain any other members
      if (!room[currentRoomId].length) {
        delete room[currentRoomId]
      }
    }
  })
})

server.listen(4000, () => {
  console.log("TCP Server running on port 4000");
});