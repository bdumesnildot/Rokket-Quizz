
//Set a local storage with level filter
const button = document.querySelectorAll("button");

button.forEach( (btn) => {
  btn.addEventListener("click", () => {
    localStorage.setItem('level', btn.id);
  })
})

//clear local storage on quit button
const quitButton =  document.querySelector("#quit");
quitButton.addEventListener("click", () => localStorage.clear());
