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
