var word = "짜장면"
while (true) {
 var answer = prompt(word)
 if (word[word.length-1] === answer[0]) {
  word = answer;
 } else {
  alert("다시!!")
 }
}