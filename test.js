// function calculateReflection(ballX, ballY, ballDirection, rectX, rectY, rectWidth, rectHeight) {
//     // 计算小球与长方体中心的相对位置
//     let relativeX = ballX - rectX;
//     let relativeY = ballY - rectY;
  
//     // 计算小球的入射角
//     let incidentAngle = Math.atan2(relativeY, relativeX);
  
//     // 计算入射角与法线的夹角
//     let normalAngle = Math.atan2(rectHeight, rectWidth);
  
//     // 计算反射角
//     let reflectionAngle = incidentAngle - 2 * (incidentAngle - normalAngle);
  
//     // 计算反射后的方向
//     let newDirection = ballDirection + (reflectionAngle - incidentAngle);
  
//     return newDirection;
//   }
  
//   // 使用示例
//   let newDirection = calculateReflection(10, 10, Math.PI/4, 0, 0, 10, 5);
//   console.log((newDirection/Math.PI)*180);

  function reflectAngle(x, y, angleInRadians, x1, y1, x2, y2) {
    // 将角度转换为方向向量
    let dx = Math.cos(angleInRadians);
    let dy = Math.sin(angleInRadians);

    // 计算线段的法线向量
    let lineVecX = x2 - x1;
    let lineVecY = y2 - y1;

    // 计算小球到线段起点的向量
    let ballToLineStartX = x - x1;
    let ballToLineStartY = y - y1;

    // 计算小球到线段的投影长度
    let projection = (ballToLineStartX * lineVecX + ballToLineStartY * lineVecY) / (lineVecX * lineVecX + lineVecY * lineVecY);
    let projectionX = lineVecX * projection;
    let projectionY = lineVecY * projection;

    // 计算反射向量
    let reflectVecX = dx - 2 * projectionX;
    let reflectVecY = dy - 2 * projectionY;

    // 计算反射角度
    let reflectAngle = Math.atan2(reflectVecY, reflectVecX);
    if (reflectAngle < 0) {
        reflectAngle += 2 * Math.PI;
    }

    return reflectAngle;
}

// 使用示例
let x = 1, y = 1; // 小球坐标
let angleInDegrees = 45; // 小球初始角度（以度为单位）
let angleInRadians = angleInDegrees * Math.PI / 180; // 将角度转换为弧度
let x1 = 0, y1 = 0, x2 = 2, y2 = 0; // 线段起点和终点
let angle = reflectAngle(x, y, angleInRadians, x1, y1, x2, y2);
console.log(angle*180/Math.PI);