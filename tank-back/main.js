const WebSocket = require("ws");
const { drawWalls } = require("./env");
const server = new WebSocket.Server({ port: 8089 });

// 先定义玩家1和2
let player1 = null;
let player2 = null;

let walls = drawWalls()
// type: 0:玩家登录，1:通知对手已上线，2：动作执行，3：墙体初始化（由玩家1客户端随机生成
server.on("connection", (socket) => {
  if (player1 === null) {
    player1 = socket;
    console.log("Player 1 connected");
    let content = { type: 0, playerNo: 1 };
    socket.send(JSON.stringify(content));
    socket.send(
                JSON.stringify({
                  type: 3,
                  walls: walls,
                })
              );
  } else if (player2 === null) {
    player2 = socket;
    console.log("Player 2 connected");
    let content = { type: 0, playerNo: 2 };
    socket.send(JSON.stringify(content));
    content = { type: 1 };
    player1.send(JSON.stringify(content));
    socket.send(
                JSON.stringify({
                  type: 3,
                  walls: walls,
                })
              );
  } else {
    console.log("A new client connected, but the game is full");
    socket.close();
    return;
  }

  socket.on("message", (message) => {
    let msg = JSON.parse(message.toString());
    if (socket === player1) {
      // console.log("Received message from Player 1:", message.toString());
      if (player2) {
        if (msg.type === 2) {
          player2.send(JSON.stringify(msg));
        }
      }
    } else if (socket === player2) {
      // console.log("Received message from Player 2:", message.toString());
      if (player1) {
        if (msg.type === 2) {
          player1.send(JSON.stringify(msg));
        }
      }
    }
  });
  /**/


  socket.on("close", () => {
    if (socket === player1) {
      player1 = null;
      console.log("Player 1 disconnected");
    } else if (socket === player2) {
      player2 = null;
      console.log("Player 2 disconnected");
    }
  });
});
