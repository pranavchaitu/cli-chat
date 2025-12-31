// tcpServer.js
import net from "net";

const clients = new Set()

const server = net.createServer();

server.on('connection', (conn) => {
  clients.add(conn)
  conn.on('data', (data) => {
    if(!conn.id) {
      conn.id = data.toString()
    } else {
      clients.forEach(i => {
        if (conn != i && i.id) {
          i.write(`${conn.id}: ${data.toString()}`);
        } 
      })
    }
  });
})

server.listen(4000, () => {
  console.log("TCP Server running on port 4000");
});