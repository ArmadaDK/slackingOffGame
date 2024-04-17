function drawWalls() {
    let walls = []
    console.log('WallsLoading');
    let wallNum = Math.floor(Math.random() * 5)
    createWalls( wallNum, walls);
    return walls
}

function createWalls( n, walls) {
    // 遍历绘制n个长方形
    for (var i = 0; i < n; i++) {
        // 生成随机位置和尺寸
        var x = Math.random() * 500;
        var y = Math.random() * 500;
        var width = Math.random() * 100;
        var height = Math.random() * 100;

        walls.push([x, y, width, height]);
    }
}

module.exports = {
    drawWalls
}