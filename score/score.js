

//Handle stars animation

function starsAnimation(starClass) {
    let stars = document.querySelectorAll(starClass);
    for (let i = 0; i < stars.length; i++) {
        let starsList = stars[i].classList;
        let result = starsList.toggle(".animated");
        if (result) {
            stars[i].classList.add("animated");
        } else {
            stars[i].classList.remove("animated");
        }
    }
}

setTimeout(() => {
    starsAnimation(".starFirst");
}, "0000")

setTimeout(() => {
    starsAnimation(".starSecond");
}, "0500")

setTimeout(() => {
    starsAnimation(".starThird");
}, "2000")

setTimeout(() => {
    starsAnimation(".starFourth");
}, "2500")

setTimeout(() => {
    starsAnimation(".starSmallFirst");
}, "3000")

setTimeout(() => {
    starsAnimation(".starSmallSecond");
}, "3500")

setTimeout(() => {
    starsAnimation(".starSmallThird");
}, "4000")

setTimeout(() => {
    starsAnimation(".starSmallFourth");
}, "4500")




//Handle score display
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


