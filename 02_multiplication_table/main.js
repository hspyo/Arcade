var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var result = num1 * num2;

var body = document.body;

var word = document.createElement('div');
word.textContent = String(num1) + '곱하기' + String(num2) + '는?';
document.body.append(word);

var form = document.createElement('form');
document.body.append(form);

var input = document.createElement('input');
form.append(input);

var button = document.createElement('button');
button.textContent = "Click";
form.append(button);

var resultView = document.createElement('div');
document.body.append(resultView);

form.addEventListener('submit', function (event) {
  event.preventDefault(); 
  if (result === Number(input.value)) {
    resultView.textContent = '딩동댕';
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    result = num1 * num2;
    word.textContent = String(num1) + '곱하기' + String(num2) + '는?';
    input.value = '';
    input.focus(); 

  } else {
    resultView.textContent = '땡! 다시';
    input.value = '';
    input.focus();
  }
});


