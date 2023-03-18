// Timer for the timer in the moon

//Global variables -----------------------------------------
const shadowDiscContainer = document.querySelector("#shadowDiscContainer");
const shadowDisc = document.querySelector("#shadowDisc");
const answerButton = document.querySelectorAll(".answer");
const time = 30;
let stopTimer = false;

//StopTimer setter
answerButton.forEach((answer) => {
  answer.addEventListener('click', () => {
    stopTimer = true;
  })
})


//Shadowdisc animation -----------------------------------------
let alpha = 0;
const pi = Math.PI;
const t = time * 2.77
const fullDisc = `<svg width="171" height="171" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="85" cy="85" r="85" fill="#424242" fill-opacity="0.8"/>
</svg>`;

function draw() {
  if (stopTimer) {
    clearInterval(shadow);
  } else if (alpha === 359) {
    clearInterval(shadow);
    shadowDiscContainer.innerHTML = fullDisc;
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
  shadowDisc.setAttribute("d", anim);
}

let shadow = setInterval(() => {
  draw();
}, t);

// Countdown -----------------------------------------
let countdown = time;

function myTimer() {
  if (countdown === 0 || stopTimer) {
    console.log("stopTimer");
    clearInterval(timer);
  } else if (countdown > 0) {
    countdown--;
  } else {
    countdown;
  }
  document.querySelector("#timerText").innerText = countdown;
}

let timer = setInterval(() => {
  myTimer(countdown);
}, 1000);
