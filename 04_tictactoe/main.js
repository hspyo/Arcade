var body = document.body;
var table = document.createElement('table');
var rows = []; // 배열이나 객체를 data라고 함.
var cells = [];
var turn = 'X';
var result = document.createElement('div');

var 비동기콜백 = function(event) {
  /*
  console.log(event.target);        // td 
  console.log(event.target.parentNode); // tr
  console.log(event.target.parentNode.parentNode); //table
  */
  var rowNum  = rows.indexOf(event.target.parentNode); //  rows배열에 해당 인덱스를 rowNum에 담는다 (몇번째 줄인가)
  console.log('몇줄', rowNum); 
  var cellNum = cells[rowNum].indexOf(event.target); // cells 배열에 rowNum째 인덱스에 td를 넣어준다. (몇번째 칸인가)
  console.log('몇칸', cellNum);
if (cells[rowNum][cellNum].textContent !== '') {   // rowNum번째줄과 cellNum번째칸이 안비었으면
}else { //빈칸이면
  cells[rowNum][cellNum].textContent = turn; // rowNum번째줄과 cellNum번째칸에 X를 채운다.
  
  // 세칸 다 채워졌나 ?
 var full = false;
 
 // 가로줄 검사
 if (
  cells[rowNum][0].textContent === turn && 
  cells[rowNum][1].textContent === turn && 
  cells[rowNum][2].textContent === turn
) {
  full = true; // 칸 다참.
 }

 // 세로줄 검사
 if (
  cells[0][cellNum].textContent === turn && 
  cells[1][cellNum].textContent === turn && 
  cells[2][cellNum].textContent === turn
) {
  full = true; // 
}

 // 대각선 검사
if (rowNum - cellNum === 0 ){ 
   if (
    cells[0][0].textContent === turn &&
    cells[1][1].textContent === turn &&
    cells[2][2].textContent === turn
   ) {
  full = true; 
   }
 }

 if (Math.abs(rowNum - cellNum) === 2){ //abs 절대값 
  if (
   cells[0][2].textContent === turn &&
   cells[1][1].textContent === turn &&
   cells[2][0].textContent === turn
  ) {
 full = true; 
  }
}

 // 다 찼으면
 if (full === true) { // === true는 생략 가능
  result.textContent = turn + '님이 승리!';
  // 초기화
 turn = 'X';
 cells.forEach(function (row) {
 row.forEach(function (cell) {
    cell.textContent = '';
 });  
 });
} else { 
if (turn === 'X') {  // turn이 X면
  turn = '0';       // trun에 0를 담는다.
} else {            // turn이 O면
  turn = 'X';       // turn에 X를 담는다.
  }
 }
}
}; 

for (i=1; i<=3; i++) {
  var row = document.createElement('tr');  // 줄(tr)을 만들어주고
  rows.push(row);                          // rows 줄배열에 row(tr)를 넣어준다.
  cells.push([]);                         // cells에 배열을 넣어주고
  for (j=1; j<=3; j++) {        
    var cell = document.createElement('td'); // 칸(td)를 만들어 cell에 담고
    cell.addEventListener('click', 비동기콜백); // cell에 click 이벤트를 넣고 비동기 콜백 함수를 실행한다.
    cells[i-1].push(cell); // 칸배열에 칸(td)를 넣어주고
    row.appendChild(cell); // row의 자식 객체(tr)로 cell(칸)을 넣는다.
  }
  table.appendChild(row);  // table의 자식객체로 row(줄)을 넣는다.
}
body.appendChild(table);    // body의 자식객체로 table을 넣는다. 
body.appendChild(result);
console.log(rows, cells);  

// check point
// 2차원 배열 / e.target과 parentNode / forEach문과 중첩반복문.
// 중첩 반복문 횟수를 줄이는게 실력
// 2차원배열 -> 반복문 2번 3차원은 3번 but  반복문 3번이상은 좋은 코드가 아님
// for() for() for() 은 괜찮음 반복문 안에 반복문이 2번까지는 괜찮음 그 이상은 안된다는 말.
