var body = document.body;
var nums;
var numArray;


function pickNums() {
  nums = [1,2,3,4,5,6,7,8,9];
  numArray = [];
  
  for (var i=0; i<4; i += 1) {
    var choicedNum = nums.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // splice(위치, 개수) : 위치로부터 개수만큼 배열에서 뽑음.
    numArray.push(choicedNum); // push : 1,2,3 ... 순서대로 배열에 넣는 것.               <--> unshift : 0번 인덱스에 추가
  }                        //pop : 배열 마지막 것부터 하나씩 뽑는 것.                 <--> shift : 처음부터 뽑는 것.
    
}
pickNums();
var result = document.createElement('h1');
body.append(result);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
form.append(input);
var button = document.createElement('button');
button.textContent = '입력';
form.append(button);

var wrong = 0;
form.addEventListener('submit', function (e) { //비동기 (언제 실행될지 모름)
  e.preventDefault(); // submit의 기본동작인 새로고침을 방지.
  var answer = input.value;
  if (answer === numArray.join('')) {
  result.textContent = '홈런';
  input.value = '';
  input.focus();
  pickNums();
  wrong = 0;
  }
  else{
    var answerArr = answer.split('');
    var strike = 0;
    var ball = 0;
    wrong += 1;
    if (wrong > 10) {
      result.textContent = "10회 초과! 실패. 정답: " + numArray.join('') + "입니다.";
      input.value = '';
      input.focus();
      pickNums();
      wrong = 0;
    } else {
    for (var i=0; i < 3; i += 1) {
      if (Number(answerArr[i]) === numArray[i]) { //같은 자리인지 확인
        console.log('같은 자리면');
        strike += 1;
      }else if (numArray.indexOf(Number(answerArr)) > -1) { // 같은 자리는 아니지만 수잦가 겹치는지 확인
        ball += 1;
      }
    }
    result.textContent = strike + 'strike' + ball + 'ball입니다.';
    input.value = '';
    input.focus();
  }
 }
});



