document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

document.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

/* script.js */

document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal");
  
    function reveal() {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
  
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
  
    window.addEventListener("scroll", reveal);
  
    // To check the scroll position on page load
    reveal();
  });
  