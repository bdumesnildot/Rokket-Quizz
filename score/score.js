

const score = localStorage.getItem("score");
const newScore = document.querySelector(".scoreContainer h2").textContent = `Score ${score} `;

/* clear score */
const homeClick = document.querySelector(".backHome")
homeClick.addEventListener("click", function () {
  localStorage.clear();
});

/* reset score */
const replayClick = document.querySelector(".replay")
replayClick.addEventListener("click", function () {
  localStorage.removeItem("score");
});