class pack {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

class wall {
    constructor(sx, sy, ex, ey) {
        this.startX = sx;
        this.startY = sy;
        this.endX = ex;
        this.endY = ey;
    }
    draw(ctx) {
        // ctx.fillStyle = '#C6723C';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#C6723C";
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
        ctx.closePath();
    }
    // 碰撞检测
    isColliding(ball) {
        let dist = Math.abs((this.endY - this.startY) * ball.x - (this.endX - this.startX) * ball.y + this.endX * this.startY - this.endY * this.startX) / Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2));
        if (dist < ball.radius) {
          return true; // 碰撞了
        }
        return false; // 没有碰撞
  }
}



