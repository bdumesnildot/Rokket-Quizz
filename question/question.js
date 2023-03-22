
/*get the data from questionDatabase.json -------------------------------------------------------------*/
const reponse = await fetch("questionsDatabase.json");
const questionList = await reponse.json();



/*global variables declaration -------------------------------------------------------------*/
//DOM and Questions handeling
const progressText = document.querySelector("#progressText")
const questionCard = document.querySelector(".questionCard");
const quitButton =  document.querySelector("#quit");
const question = document.querySelector(".question");
const answerButton = document.querySelectorAll(".answer");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const skipNext = document.querySelector(".skipNextButton");
let gameProgression = 1;
let score = 0;
let questionObj = {};
// timer 
const time = 30;
let countdown = time;
let shadow; //store a setInterval
let timer; //store a setInterval
let alpha = 0;
const pi = Math.PI;
const t = time * 2.77
const shadowDiscInitial = `<svg width="171" height="171" viewbox="0 0 250 250">
<path id="shadowDisc" transform="translate(125, 125)" d="" />
</svg>`

const shadowDiscFull = `<svg width="171" height="171" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="85" cy="85" r="85" fill="#424242" fill-opacity="0.8"/>
</svg>`;



/*Applying filters on questionListToDisplay ----------------------------------------------------*/
let questionListToDisplay = questionList;
let level = localStorage.getItem('level');
let categorie = localStorage.getItem('categorie');

if (level != "random") {questionListToDisplay = questionListToDisplay.filter( (current) => current.level === level)}
if (categorie != "random") {questionListToDisplay = questionListToDisplay.filter( (current) => current.categorie === categorie)}


/*INITIATE - Generate a random index question and send it to DOM ----------------------------------------------------*/
let questionIndex = Math.floor(Math.random() * questionListToDisplay.length);
questionCardGenerator(questionListToDisplay, questionIndex);


/*Handeling event listeners -------------------------------------------------------------*/

//clicking an answer
answerButton.forEach((answer) => {
  answer.addEventListener("click", () => {
    console.log(`you clicked ${answer.id}`);
    setAnswerColor()

    //if user choose the right answer
    if (questionObj[answer.id][1] === 1) {
      score += countdown * 50;
      incrementRotation(1);
    }

    //Stop the timer
    timerGlobalStop()

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

//Handle the skip / next / score button
skipNext.addEventListener("click", (event) => { 
  gameProgression++;
  gameProgression <= 10 ? progressText.innerHTML = `${gameProgression}/10`: "";

  if (skipNext.classList.contains("skip")) { //clicking skip
    event.preventDefault();
    feedBack();//--dev usage 

    timerGlobalStop()

    questionIndex = Math.floor(Math.random() * questionListToDisplay.length);
    questionCardGenerator(questionListToDisplay, questionIndex);
  
  } else if (skipNext.classList.contains("next")) { //clicking next
    event.preventDefault();

    questionIndex = Math.floor(Math.random() * questionListToDisplay.length);
    questionCardGenerator(questionListToDisplay, questionIndex);

  } else if (skipNext.classList.contains("score")) { //clicking score
    localStorage.setItem('score', score);
    console.log("score button pressed");

  } else {
    event.preventDefault();
    console.log("toogle Skip next button issue");
  }

})

//Handle quit button
quitButton.addEventListener("click", () => localStorage.clear());


/*Functions declaration -------------------------------------------------------------*/

function feedBack() { //log feed back in the console --dev usage
  let feedBack = {
    progression : gameProgression,
    score : score,
    questionObj : questionObj,
  }
  console.log("FEED BACK :\n", feedBack);
}

function questionCardGenerator(list, i) { //Send HTML question to DOM
  resetAnswerColor(answer1);
  resetAnswerColor(answer2);
  resetAnswerColor(answer3);
  resetAnswerColor(answer4);
  enableAnswerClick()
  gameProgression === 10 ? DisplaySkipToScoreButton() : displaySkipButton();
  
  questionObj = list.splice(i,1)[0];
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

  timerGlobalStart()

  //--dev usage 
  feedBack(); 
}

function incrementRotation(n) { //Animate progression Rocket
  const root = document.querySelector(":root");
  let cssVarIncrementState = getComputedStyle(root).getPropertyValue("--increment");
  cssVarIncrementState++;
  root.style.setProperty('--increment', `${cssVarIncrementState}`);
}

function setAnswerColor() {
  for (let i = 1; i < 5; i++) {
    if (questionObj[`answer${i}`][1] === 1) {
      document.querySelector(`#answer${i}`).classList.add("answerColorTrue");
    } else {
      document.querySelector(`#answer${i}`).classList.add("answerColorFalse");
    }
  }
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

function timerGlobalStart() { //start draw() + myTimer() functions
  countdown = time;
  alpha = 0;
  document.querySelector("#timerText").innerText = countdown;
  shadowDiscContainer.innerHTML = shadowDiscInitial;

  shadow = setInterval(() => {
    draw();
  }, t);
  
  timer = setInterval(() => {
    myTimer(countdown);
  }, 1000);
}

function timerGlobalStop() { //stop draw() + myTimer() functions
  clearInterval(shadow);
  clearInterval(timer);
}

function draw() { //Draw ellipse shadow circle
  if (alpha === 359) {
    clearInterval(shadow);
    shadowDiscContainer.innerHTML = shadowDiscFull;
  } else if (alpha < 359) {
    alpha++;
  } else {
    alpha;
  }
  alpha %= 360;
  let r = (alpha * pi) / 180;
  let x = Math.sin(r) * 125;
  let y = Math.cos(r) * -125;
  let mid = alpha > 180 ? 1 : 0;
  let anim = `M 0 0 v -125 A 125 125 1 ${mid} 1 ${x} ${y} z`;

  alpha < 359 ? shadowDisc.setAttribute("d", anim) : "";
}

function myTimer() { //Display a countdown
  if (countdown === 1) {
    clearInterval(timer);
    setAnswerColor();
    disableAnswerClick();
    countdown = 0;

    if (gameProgression >= 10) {
      displayScoreButton()
    } else {
      displayNextButton();
    }
    
  } else if (countdown > 1) {
    countdown--;
  } else {
    countdown;
  }
  document.querySelector("#timerText").innerText = countdown;
}
