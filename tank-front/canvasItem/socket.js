// 创建 WebSocket 连接
const socket = new WebSocket("ws://localhost:8089");

let playerNo = 0;
let enemyOnline = false;
let enemyKeys = {
  KeyA: false,
  KeyD: false,
  KeyS: false,
  KeyW: false,
  KeyQ: false,
  KeyE: false,
  Space: false,
};
// 当连接建立时触发
socket.onopen = () => {
  console.log("WebSocket 连接已建立");

  // 向服务器发送消息
  //   socket.send("Hello, WebSocket Server!");
};

// 当收到服务器消息时触发
socket.onmessage = (event) => {
  // console.log("Received message from server:", event.data);
  let msg = JSON.parse(event.data);
  switch (msg.type) {
    case 0:
      playerNo = msg.playerNo;
      // 不是1号玩家说明对手在线
      if (playerNo !== 1) {
        enemyOnline = true;
      }
      break;
    case 1:
      // 被通知对手上线
      enemyOnline = true;
      break;
    case 2:
      // 对手执行动作
      enemyKeys = msg.key;
      break;
  }
  // console.log(playerNo);
  // 在这里处理从服务器接收到的消息
};

// 当连接关闭时触发
socket.onclose = () => {
  console.log("WebSocket 连接已关闭");
};

// 当连接发生错误时触发
socket.onerror = (error) => {
  console.error("WebSocket 连接发生错误:", error);
};
