// Event listener for Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
    toggleMenu();
  }
});

document.getElementById('openModal').addEventListener('click', function() {
  openModal();
});

document.getElementById('closeModal').addEventListener('click', function() {
  closeModal();
});

// Close the modal if the overlay is clicked
document.addEventListener('click', function(event) {
  if (event.target === document.getElementById('modal')) {
    closeModal();
  }
});

// Function to close the modal with ease-out effect
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.transition = 'opacity 0.2s ease-in-out';

  setTimeout(() => {
    modal.style.opacity = '0';
  }, 10);

  setTimeout(() => {
    modal.style.display = "none";
    modal.style.transition = '';
    modal.style.opacity = '';
    modal.classList.remove("open");
  }, 300);
}

// Function to open the modal with ease-in effect
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  modal.style.transition = 'opacity 0.2s ease-in-out';

  setTimeout(() => {
    modal.style.opacity = '1';
    modal.classList.add("open");
  }, 10);
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
