const helpButton = document.getElementById("helpButton");
const helpModal = document.getElementById("helpModal");
const closeModal = document.querySelector(".close");

helpButton.addEventListener("click", function () {
  helpModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  helpModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === helpModal) {
    helpModal.style.display = "none";
  }
});
