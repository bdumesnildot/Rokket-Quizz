// Timer for the timer in the moon

//Shadowdisc animation
let shadowDiscContainer = document.querySelector("#shadowDiscContainer");
let shadowDisc = document.querySelector("#shadowDisc");

let alpha = 0;
let pi = Math.PI;
let t = 26;
let fullDisc = `<svg width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="85" cy="85" r="85" fill="#424242" fill-opacity="0.8"/>
</svg>`;

function draw() {
  if (alpha < 359) {
    alpha++;
  } else if (alpha === 359) {
    clearInterval(shadow);
    console.log(fullDisc);
    shadowDiscContainer.innerHTML = fullDisc;
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
  console.log(anim);
}

let shadow = setInterval(() => {
  draw();
}, t);

// Countdown
let countdown = 10;

function myTimer() {
  if (countdown > 0) {
    countdown--;
  } else if (countdown === 0) {
    clearInterval(timer);
  } else {
    countdown;
  }
  console.log(countdown);
  document.querySelector("#timerText").innerText = countdown;
}

let timer = setInterval(() => {
  myTimer(countdown);
}, 1000);
