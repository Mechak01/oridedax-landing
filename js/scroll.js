// js/scroll.js
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Add slight stagger delay for grouped elements (like service cards)
        const delay = Math.random() * 150 + index * 100;
        setTimeout(() => el.classList.add("show"), delay);

        observer.unobserve(el); // animate once
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));
});
