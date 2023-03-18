/*Question card generator*/

// get the data from questionDatabase.json
const reponse = await fetch("questionsDatabase.json");
const questionList = await reponse.json();

//targetting html tags
const question = document.querySelector(".question");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

function questionCardGenerator(list, i) {
  const questionText = list[i].question;
  const answer1Array = list[i].answer1;
  const answer2Array = list[i].answer2;
  const answer3Array = list[i].answer3;
  const answer4Array = list[i].answer4;

  console.log(
    questionText,
    answer1Array,
    answer2Array,
    answer3Array,
    answer4Array,
    list[i].level
  );

  //send values to DOM
  question.innerHTML = questionText;
  answer1.innerHTML = answer1Array[0];
  answer2.innerHTML = answer2Array[0];
  answer3.innerHTML = answer3Array[0];
  answer4.innerHTML = answer4Array[0];
}

let r = Math.floor(Math.random() * questionList.length);
console.log(questionList.length, r);
questionCardGenerator(questionList, r);
