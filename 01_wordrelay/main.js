var body = document.body;

var word = document.createElement('div');
word.textContent = "짜장면";
document.body.append(word);

var form = document.createElement('form');
document.body.append(form);

var input = document.createElement('input');
form.append(input);

var button = document.createElement('button');
button.textContent = "Click";
form.append(button);

var result = document.createElement('div');
document.body.append(result);

form.addEventListener('submit', function 콜백함수 (event) {
  event.preventDefault(); // 새로고침 방지
  if (word.textContent[word.textContent.length - 1] === input.value[0]) {
    result.textContent = '딩동댕';
    word.textContent = input.value;
    input.value = '';
    input.focus(); // 입력 후 입력창에 다시 자동커서

  } else {
    result.textContent = '땡! 다시';
    input.value = '';
    input.focus();
  }
});
