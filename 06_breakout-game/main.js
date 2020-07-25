var canvas = document.getElementById("myCanvas"); // canvas 엘리먼트에 대한 참조를 canvas 변수에 저장
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 5;
var dy = -5;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width-paddleWidth)/2 // 시작점
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

// 벽돌 그릴 좌표.
var bricks = [];                    
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  } 
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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
// 마우스
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft; // 뷰포트와 캔버스의 왼쪽 가장자리 사이의 거리를 뺀값.
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2; 
  }
}

//충돌 감지 함수
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
          var b = bricks[c][r]; //벽돌 객체를 저장하는 b
          if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score += 20;
            if(score == brickRowCount*brickColumnCount *20) {
              alert("You Win!. Congratulations!! Total : " + score );
              document.location.reload();
            }
          }
        } 
      }
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

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) { // 
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft; //벽돌의 x좌표
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop; //벽돌의 y좌표
        bricks[c][r].x = brickX;  
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight); // 뱍돌그리기
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// 점수
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095dd";
  ctx.fillText("Score: "+score, 8, 20); // 8 20은 x,y 좌표
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20)
}
// 공 움직이기

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);              // 좌상단 우하단 좌표들안에 있는 내용들 모두 지워줌.
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) { //원의반지름뺀 오른쪽 || 원의반지름 뺀 왼쪽 / x + dx-> 공의 반지름 x좌표 
    dx = -dx; 
  }
  if(y + dy < ballRadius) { // 위쪽 벽튕기기 (공 중심 y좌표가 반지름보다 작으면)
    dy = -dy;               // dy값을 -2에서 2로 변경. (y값이 커질수록 아래로 내려감)
  } 
  else if(y + dy > canvas.height-ballRadius) {     // 아래쪽 벽 (공 중심 y좌표가 캔버스높이-공반지름보다 클경우)
    if(x > paddleX && x < paddleX + paddleWidth) { // 패들안에 있을 경우 PaddleX는 패들의 왼쪽하단 x값을 의미
      dy = -dy;                                    // dy 값을 2에서 -2로 변경 (y값이 작을수록 위로 올라감)
    }
    else {              // 패들안에 공이 없는 경우 게임 오버
      lives--;
      if(!lives) {      // 목숨이 없을경우 게임 종료
        alert("GAME OVER");
        document.location.reload();
      } 
      else {            // 목숨이 있을 경우 공과 패들 위치 리셋
         x = canvas.width/2;
         y = canvas.height-30;
         dx = 5;
         dy = -5;
         paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) { //[캔버스 넓이 - 패들넓이] 빼준 만큼만 오른쪽 패들 이동할 수 있음.
    paddleX += 7;                                          // 오른쪽 방향키 누를때마다 패들 x좌표 3씩 증가
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;                                         // 왼쪽 방향키 누를때마다 패들 y좌표 3씩 감소
  }
  
  x += dx; //공의 중심 x좌표
  y += dy; //공의 중심 y좌표 -> 이 둘을 계속 더하고 빼줌으로써 공을 움직이게함.

  
  requestAnimationFrame(draw); // draw함수를 다시 그려줍니다.
}

draw();





