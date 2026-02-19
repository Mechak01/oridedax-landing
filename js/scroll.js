// js/scroll.js
document.addEventListener("DOMContentLoaded", () => {
  /* ============================
     Reveal-on-scroll animations
  ============================ */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Subtle stagger for grouped elements
          const delay = Math.random() * 120 + index * 80;
          setTimeout(() => el.classList.add("show"), delay);

          observer.unobserve(el); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));

  /* ============================
     ✨ Hero parallax micro-motion
  ============================ */
  const orbit = document.querySelector(".hero-bg-orbits");
  if (!orbit) return;

  let lastScrollY = 0;
  let ticking = false;

  function updateOrbit() {
    const y = lastScrollY * 0.08;
    orbit.style.transform = `translate(-50%, calc(-50% + ${y}px)) scale(1.03)`;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(updateOrbit);
      ticking = true;
    }
  });
});
