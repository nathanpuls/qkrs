document.getElementById('openModal').addEventListener('click', function() {
    toggleMenu();
  });
  
  document.getElementById('closeModal').addEventListener('click', function() {
    toggleMenu();
  });
  
  function toggleMenu() {
    var menuIcon = document.getElementById('openModal');
    var menu = document.getElementById('menu');
  
    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'flex';
      menuIcon.classList.add('open');
    } else {
      menu.style.display = 'none';
      menuIcon.classList.remove('open');
    }
  }
  