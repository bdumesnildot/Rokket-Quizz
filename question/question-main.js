

/*get the data from questionDatabase.json -------------------------------------------------------------*/
const reponse = await fetch("questionsDatabase.json");
const questionList = await reponse.json();

/*global variables declaration -------------------------------------------------------------*/
const progressText = document.querySelector("#progressText")
const questionCard = document.querySelector(".questionCard");
const question = document.querySelector(".question");
const answerButton = document.querySelectorAll(".answer");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const skipNext = document.querySelector(".skipNextButton");
let questionListToDisplay = questionList;
let gameProgression = 1;
let score = 0;
let questionObj = {}; 



/*Applying filters on questionListToDisplay */




//WIT

/*INITIATE - Generate a random index question and send it to DOM -------------------------------------------------------------*/
let questionIndex = Math.floor(Math.random() * questionListToDisplay.length);
questionCardGenerator(questionListToDisplay, questionIndex);
feedBack();

/*Handeling player ansers -------------------------------------------------------------*/

//clicking an answer
answerButton.forEach((answer) => {
  answer.addEventListener("click", () => {
    let answerClicked = document.querySelector(`#${answer.id}`);

    //if user choose the right answer
    if (questionListToDisplay[questionIndex][answer.id][1] === 1) {
      setAnswerColorTrue(answerClicked);
      score++;
      incrementRotation(1);
      
    //if user select the wrong answer
    } else {
      setAnswerColorFalse(answerClicked);
      switch (true) {
        case questionListToDisplay[questionIndex].answer1[1] === 1:
          setAnswerColorTrue(answer1);
          break;
        case questionListToDisplay[questionIndex].answer2[1] === 1:
          setAnswerColorTrue(answer2);
          break;
        case questionListToDisplay[questionIndex].answer3[1] === 1:
          setAnswerColorTrue(answer3);
          break;
        case questionListToDisplay[questionIndex].answer4[1] === 1:
          setAnswerColorTrue(answer4);
          break;
        default:
          console.error("answer color switch setter doesn't work");
          break;
      }
    }
    //Disable click on anwsers
    disableAnswerClick();

    //Display skip / score button
    if (gameProgression >= 10) {
      displayScoreButton()
    } else {
      displayNextButton();
    }

  });
});



skipNext.addEventListener("click", (event) => {
  gameProgression++;
  gameProgression <= 10 ? progressText.innerHTML = `${gameProgression}/10`: "";

  feedBack();

  if (skipNext.classList.contains("skip")) { //clicking skip
    event.preventDefault();
    console.log("SKIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");

    questionIndex = Math.floor(Math.random() * questionListToDisplay.length);
    questionCardGenerator(questionListToDisplay, questionIndex);
  
  } else if (skipNext.classList.contains("next")) { //clicking next
    event.preventDefault();
    console.log("NEXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");

    questionIndex = Math.floor(Math.random() * questionListToDisplay.length);
    questionCardGenerator(questionListToDisplay, questionIndex);

  } else if (skipNext.classList.contains("score")) {
    console.log("score button pressed");

  } else {
    event.preventDefault();
    console.log("toogle Skip next button issue");
  }

})



/*Functions declaration -------------------------------------------------------------*/

function feedBack() { //log feed back in the console --dev usage
  console.log("THIS IS A NEW FEED BACK")
  console.log("Progression on 10 : ", gameProgression);
  console.log("score : ", score);
  console.log("question Obj : ", questionObj);
}

function questionCardGenerator(list, i) { //Send HTML question to DOM
  resetAnswerColor(answer1);
  resetAnswerColor(answer2);
  resetAnswerColor(answer3);
  resetAnswerColor(answer4);
  enableAnswerClick()
  gameProgression === 10 ? DisplaySkipToScoreButton() : displaySkipButton();
  
  questionObj = list.splice(i,1)[0];
  console.log(questionObj);
  const questionText = questionObj.question;
  const answer1Array = questionObj.answer1;
  const answer2Array = questionObj.answer2;
  const answer3Array = questionObj.answer3;
  const answer4Array = questionObj.answer4;

  //send values to DOM
  question.innerHTML = questionText;
  answer1.innerHTML = answer1Array[0];
  answer2.innerHTML = answer2Array[0];
  answer3.innerHTML = answer3Array[0];
  answer4.innerHTML = answer4Array[0];
}

function incrementRotation(n) { //Animate progression Rocket
  const root = document.querySelector(":root");
  let cssVarIncrementState = getComputedStyle(root).getPropertyValue("--increment");
  cssVarIncrementState++;
  root.style.setProperty('--increment', `${cssVarIncrementState}`);
}

function setAnswerColorTrue(element) { //Handle background-color for good answer
  element.classList.add("answerColorTrue");
}

function setAnswerColorFalse(element) { //Handle background-color for wrong answer
  element.classList.add("answerColorFalse");
}

function resetAnswerColor(element) { //Reset background-color
  element.classList.remove("answerColorTrue");
  element.classList.remove("answerColorFalse");
}

function disableAnswerClick() { //Prevent multi answer click
  answer1.classList.add("noClick");
  answer2.classList.add("noClick");
  answer3.classList.add("noClick");
  answer4.classList.add("noClick");
}

function enableAnswerClick() { //Reset click possibilities
  answer1.classList.remove("noClick");
  answer2.classList.remove("noClick");
  answer3.classList.remove("noClick");
  answer4.classList.remove("noClick");
}

function displayNextButton() { //Mutate anchor to next question
  skipNext.innerHTML = "Next";
  skipNext.classList.add("next");
  skipNext.classList.remove("skip");
}

function displaySkipButton() { //Muttate anchor to skip question 
  skipNext.innerHTML = "Skip";
  skipNext.classList.add("skip");
  skipNext.classList.remove("next");
}

function DisplaySkipToScoreButton() {
  skipNext.innerHTML = "Skip to score";
  skipNext.href = "../score/score.html";
  skipNext.classList.add("score");
  skipNext.classList.remove("skip");
  skipNext.classList.remove("next");
  skipNext.style.width = "20%";
}

function displayScoreButton() { //Muttate anchor to score
  skipNext.innerHTML = "Score";
  skipNext.href = "../score/score.html";
  skipNext.classList.add("score");
  skipNext.classList.remove("skip");
  skipNext.classList.remove("next");
  skipNext.style.width = "8%";
}

