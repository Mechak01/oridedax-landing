// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("menu-overlay");
  const navbar = document.querySelector(".navbar");

  // ✅ Toggle open / close
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = hamburger.classList.toggle("active");
    navLinks.classList.toggle("active", isActive);
    overlay.classList.toggle("active", isActive);
    document.body.classList.toggle("menu-open", isActive);
  });

  // ✅ Stop clicks inside the nav from closing it
  navLinks.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // ✅ Close when overlay clicked
  overlay.addEventListener("click", () => closeMenu());

  // ✅ Close when nav link clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // ✅ Close when clicking anywhere outside of hamburger or nav menu
  document.addEventListener("click", (e) => {
    const isClickInsideMenu =
      navLinks.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInsideMenu && navLinks.classList.contains("active")) {
      closeMenu();
    }
  });

  // ✅ Navbar shrink on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }
  });

  // ✅ Helper function to cleanly close menu
  function closeMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});
