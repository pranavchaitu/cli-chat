// tcpClient.js
import net from "net";
import readline from "readline";

const client = net.connect(4000, () => {
  console.log("enter your name first and press enter");
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
  if (input == "exit") {
    rl.close();
  }
});

rl.on('close', () => {
  process.exit(0);
});
