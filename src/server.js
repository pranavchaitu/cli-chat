// tcpServer.js
import net from "net";

const clients = new Set()
const name = {}

const server = net.createServer((socket) => {
  clients.add(socket)
  socket.on("data",async (data) => {
    if (!name[socket]) {
      name[socket] = data.toString()
    } else {
      const username = name[socket]
      for(let user of clients) {
        if(user != socket) {
          user.write(username.toString() + ":" + data.toString());
        }
      }
    }
  });
  socket.on("close", () => {
    clients.delete(socket)
    delete name[socket]
  })
  socket.on('error',(err) => {
    console.log(err);
  })
});

server.listen(4000, () => {
  console.log("TCP Server running on port 4000");
});


