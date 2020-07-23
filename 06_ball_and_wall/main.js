var canvas = document.getElementById("myCanvas"); // canvas 엘리먼트에 대한 참조를 canvas 변수에 저장
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width-paddleWidth)/2 // 시작점
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  } 
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

// 공 그리기

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2); // 원의 중심을 가리키는 x,y좌표 , 반지름, 시작 각도와 끝 각도, false 시계방향 (기본값과 true는 반시계)
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}



// 공 움직이기

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 좌상단 우하단 좌표들안에 있는 내용들 모두 지워줌.
  drawBall();
  drawPaddle();
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) { // 패들보다
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
    }
    
  }

  x += dx;
  y += dy;

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  
}


setInterval(draw, 10); // 멈출때까지 매초 원이 그려짐





