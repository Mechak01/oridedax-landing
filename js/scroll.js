// js/scroll.js

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal, .zoom-scroll, .gallery-item');

function handleScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.85;

    if (inView) {
      el.classList.add('reveal-visible');

      if (el.classList.contains('zoom-scroll') || el.classList.contains('gallery-item')) {
        el.classList.add('visible');
      }
    }
  });

  // Scroll-to-top button visibility
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  }
}

// Scroll to top logic
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  initScrollToTop();
  window.addEventListener('scroll', handleScroll);
});
