// Event listener for Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
      closeModal();
      toggleMenu();
  }
});
document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
  });
  
  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
  });
  
  // Close the modal if the overlay is clicked
  document.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
      document.getElementById('modal').style.display = 'none';
    }
  });
  // Function to close the modal
  function closeModal() {
    document.getElementById("modal").style.display = "none";
}
function openModal() {
  document.getElementById("modal").style.display = "block";
}


  
// hamburger menu



function toggleMenu() {
  const menuButton = document.querySelector('.hamburger-menu');
  menuButton.classList.toggle('change');
  if (menuButton.classList.contains('change')) {
    openModal();
  } else {
    closeModal();
  }
}