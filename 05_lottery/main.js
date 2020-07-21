var nums = Array(45) // 빈 배열 45개
  .fill()   // 배열에 값을 넣는 함수
  .map(function(요소, index) { // 배열의 각 인덱스에 return값을 매핑해주는 것.
    return index + 1;
});
console.log(nums);

// for문 while문
// for문 : 몇번 반복해야할지 알고 있을 때 사용
// while문 : 자신이 몇번 반복할지 모를 때, 기준 값이 계속 바뀔 때 사용

var shuffle = [];
while (nums.length > 0) {
  var 이동값 = nums.splice(Math.floor(Math.random() * nums.length), 1)[0]; // 랜덤한 자리수에서 1개를 뽑음.
  shuffle.push(이동값);
}
console.log(shuffle);
var bonus = shuffle[shuffle.length - 1];
var selectedNum = shuffle
  .slice(0, 6) // 0부터 5까지 자름
  .sort(function (p, c) { 
    return p - c; // -> 오름차순 <--> c - p면 내림 차순!
  });

  // p - c > 0 이면 자리를 바꿈 < 0 이면 안바꿈
  // 예를들어 뽑인 숫자가 [ 7 3 4 5 6 8] 이라고 하자.
  // ex p = 7, c = 3   7 - 3 = 4 > 0  [ 3 7 4 5 6 8]
  //    p = 7, c = 4   7 - 4 = 3 > 0  [ 3 4 7 5 6 8]
  console.log('당첨숫자들', selectedNum, '보너스', bonus );

  var resultView = document.querySelector('#resultView'); // HTML 태그 선택하기
  

  // 다른 부분은 매개변수로, 겹치는 부분은 함수로!!!!!!!!!!!!!!!!
  function paintingBall (num, resultView) {
    var ball = document.createElement('div');
    ball.textContent = num;
    ball.style.display = 'inline-block';        // CSS 태그 조작하기
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '20px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '15px';
    var bgColor;
    if (num <= 10) {
      bgColor = 'red';
    } else if (num <= 20) {
      bgColor = 'orange';
    } else if (num <= 30) {
      bgColor = 'yellow';
    } else if (num <= 40) {
      bgColor = 'blue';
    } else {
      bgColor = 'green';
    }
    ball.style.background = bgColor;
    resultView.appendChild(ball);
  }

  // 나중에 클로져 도입하자. 일단은 나열...
    setTimeout(function 비동기콜백함수() {
      paintingBall(selectedNum[0], resultView);
    }, 1000); // 1000 밀리당 1초
    
    setTimeout(function 비동기콜백함수() {
      paintingBall(selectedNum[1], resultView);
    }, 2000);
    setTimeout(function 비동기콜백함수() {
      paintingBall(selectedNum[2], resultView);
    }, 3000);
    setTimeout(function 비동기콜백함수() {
      paintingBall(selectedNum[3], resultView);
    }, 4000);
    setTimeout(function 비동기콜백함수() {
      paintingBall(selectedNum[4], resultView);
    }, 5000);
    setTimeout(function 비동기콜백함수() {
      paintingBall(selectedNum[5], resultView);
    }, 6000);

    setTimeout(function 비동기콜백함수() {
      var cell = document.querySelector('.bonusCell');
      paintingBall(bonus, cell);
    }, 7000);
  


  