document.getElementById("search-btn").addEventListener("click", function(event) {
    event.preventDefault();

    var searchBar = document.getElementById("search-bar");
    
    searchBar.classList.toggle("active");
});


// Scroll-Down Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .feature-item, .card, .testimonial-content');

window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementTop > 0) {
            el.classList.add('active');
        }
    });
});
