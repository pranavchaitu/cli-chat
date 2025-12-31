// tcpClient.js
import net from "net";
import readline from "readline";

const client = net.connect(4000,() => {
  process.stdout.write("connected to server, enter your name: ")
});

client.on("data", (data) => {
  console.log(data.toString());
});

const rl = readline.createInterface({
  input: process.stdin,
  output : process.stdout
});

rl.on('line', (input) => {
  client.write(input)
});