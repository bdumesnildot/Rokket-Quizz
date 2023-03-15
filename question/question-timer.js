// Timer for the timer in the moon

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
