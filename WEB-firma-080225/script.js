const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-menu ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      navMenu.classList.remove('active');
    }
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});