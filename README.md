# slackingOffGame

自制基于 websocket 的局域网联机摸鱼坦克大战（改）小游戏

# 前端 tank-front

纯原生 canvas
player.js：用户及小球的类定义
socket.js：用于连接及处理 websocket 数据
bg.png:可以随便用图片，比如我这个代码图，F11 全屏，沉浸式摸鱼

# 后端 tank-back

只做消息转发，甚至没起服务

# 后端启动：node main.js

# 待修改问题：

1. 当页面没在打开或者被隐掉的时候前端不会渲染收到的 ws 消息
2. 未进行设计伤害判定
