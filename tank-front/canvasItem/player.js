// 玩家实例类
class playerInstance {
  constructor(x, y, color, direction = 0) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 10;
    this.isAlive = true;
    this.direction = direction;
  }

  // 是否受击
  isHurt(balls) {
    for (let item of balls) {
      console.log(this.x, this.y, item.x, item.y);
      let distance = getDistance(this.x, this.y, item.x, item.y)
      if (distance <= this.radius) {
        console.log(distance);
        this.isAlive = false;
        break;
      }
    }
  }
  // 是否已输
  isLosen = () => {
    if (!this.isAlive) {
      return true;
    }
  };
  goLeft = () => {
    if (this.x - 1 > 0) {
      this.x -= 1;
    }
  };
  goRight = () => {
    if (this.x + 1 < 1000) {
      this.x += 1;
    }
  };
  goUp = () => {
    if (this.y - 1 > 0) {
      this.y -= 1;
    }
  };
  goDown = () => {
    if (this.y + 1 < 1000) {
      this.y += 1;
    }
  };

  turnLeft = () => {
    this.direction -= (8 / 180) * Math.PI;
    console.log(this.direction);
  };
  turnRight = () => {
    this.direction += (8 / 180) * Math.PI;
    console.log(this.direction);
  };

  // 玩家绘制
  draw(ctx) {
    if (this.radius <= 0) {
      this.isAlive = false;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();

    // 三角炮管绘制
    let Lx = 0;
    let Ly = 0;
    let Rx = 0;
    let Ry = 0;
    let Px = 0;
    let Py = 0;
    Lx = this.x + Math.cos(this.direction - (12 / 180) * Math.PI) * this.radius;
    Ly = this.y + Math.sin(this.direction - (12 / 180) * Math.PI) * this.radius;
    const leftPos = [Lx, Ly];
    Rx = this.x + Math.cos(this.direction + (12 / 180) * Math.PI) * this.radius;
    Ry = this.y + Math.sin(this.direction + (12 / 180) * Math.PI) * this.radius;
    const rightPos = [Rx, Ry];
    Px = this.x + Math.cos(this.direction) * (this.radius + 5);
    Py = this.y + Math.sin(this.direction) * (this.radius + 5);
    const Pos = [Px, Py];

    ctx.beginPath();
    ctx.moveTo(...Pos); // 顶点
    ctx.lineTo(...rightPos); // 底边右端点
    ctx.lineTo(...leftPos); // 底边左端点
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
  }
  // 空格射击小球
  shoot(balls) {
    // 每射一发就会变小
    // this.radius--;
    // 创建小球实例
    const oneBall = new ball(
      this.x + Math.cos(this.direction) * (this.radius + 1),
      this.y + Math.sin(this.direction) * (this.radius + 1),
      this.color,
      this.direction
    );
    // 存入数组以便多个子弹一起渲染
    balls.push(oneBall);
  }
}

// 炮弹小球类
class ball {
  constructor(x, y, color, direction) {
    this.time = 120; // 存在时间，如超过时间就会消失
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.direction = direction;
  }
  /**
   * 绘制飞行中的小球
   * @param {*} ctx
   * @param {*} step 速度，以后可以设置一些道具获得子弹加速
   */
  biu = (ctx, step = 10) => {
    this.x = this.x + Math.cos(this.direction) * step;
    this.y = this.y + Math.sin(this.direction) * step;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    // 120帧消失
    this.time--;
  };
  // 小球是否应该消失
  isEmpty = () => {
    return this.time <= 0;
  };
}

function getDistance(Ax, Ay, Bx, By) {
  return Math.sqrt(Math.pow(Ax - Bx, 2) + Math.pow(Ay - By, 2))
}
