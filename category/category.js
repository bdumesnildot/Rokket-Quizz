
//Set a local storage with categorie filter
const button = document.querySelectorAll("button");

button.forEach( (btn) => {
  btn.addEventListener("click", () => {
    localStorage.setItem('categorie', btn.id);
  })
})


//clear local storage on quit button
const quitButton =  document.querySelectorAll(".quit");

quitButton.forEach( (quitBtn) => {
  quitBtn.addEventListener("click", () => localStorage.clear());
})
