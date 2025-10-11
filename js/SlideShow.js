// ✅ SlideShow.js
// Handles mockup slider functionality for the "About" section

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("mockup-slider");
  if (!slider) return; // Safety check

  const slidesContainer = slider.querySelector(".slides");
  const slides = slider.querySelectorAll(".slides img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  const dotsContainer = slider.querySelector(".slider-dots");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  // ✅ Create dot indicators dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".dot");

  // ✅ Go to specific slide
  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides; // wrap-around
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    resetAutoSlide();
  }

  // ✅ Update active dot styling
  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // ✅ Next & Previous handlers
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // ✅ Auto slide (every 5s)
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // ✅ Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // ✅ Initialize slider
  goToSlide(0);
  startAutoSlide();
});
