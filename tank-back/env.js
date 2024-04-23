function drawWalls() {
    let walls = []
    console.log('WallsLoading');
    let wallNum = Math.floor(Math.random() * 10)
    createWalls( wallNum, walls);
    return walls
}

function createWalls( n, walls) {
    // 遍历绘制n个长方形
    for (var i = 0; i < n; i++) {
        // 生成随机位置和尺寸
        var sx = Math.random() * 500;
        var sy = Math.random() * 500;
        var ex = Math.random() * 500;
        var ey = Math.random() * 500;

        walls.push([sx, sy, ex, ey]);
    }
    console.log(walls);
    return walls
}

module.exports = {
    drawWalls
}