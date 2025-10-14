// js/reviews.js
document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.getElementById("review-slides");
  const dotsContainer = document.getElementById("review-dots");
  const prevBtn = document.getElementById("reviews-prev");
  const nextBtn = document.getElementById("reviews-next");
  const reviewSlider = document.querySelector(".review-slider");

  const placeholderReviews = [
    {
      name: "Sarah D.",
      location: "Antwerpen",
      message: "Super handig platform! Ik kon makkelijk een betrouwbare begeleider vinden.",
      rating: 5
    },
    {
      name: "Tom V.",
      location: "Gent",
      message: "Heel duidelijk systeem. Ik kijk uit naar de lancering van de app!",
      rating: 4
    },
    {
      name: "Leila M.",
      location: "Brussel",
      message: "OrideDax maakt leren rijden eindelijk simpel en overzichtelijk.",
      rating: 5
    }
  ];

  let currentIndex = 0;
  let autoSlideInterval;

  function renderSlides(data) {
    slidesContainer.innerHTML = data
      .map(
        (r) => `
        <div class="review-card">
          <div class="review-rating">${"⭐".repeat(r.rating)}</div>
          <p class="review-message">"${r.message}"</p>
          <p class="review-author">– ${r.name}, ${r.location}</p>
        </div>`
      )
      .join("");

    dotsContainer.innerHTML = data
      .map(
        (_, i) =>
          `<span class="dot ${i === 0 ? "active" : ""}" data-index="${i}"></span>`
      )
      .join("");

    slidesContainer.style.width = `${data.length * 100}%`;
    slidesContainer.querySelectorAll(".review-card").forEach(card => {
      card.style.width = `${100 / data.length}%`;
    });

  }

  function updateSlide(index) {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((d) => d.classList.remove("active"));
    dots[index].classList.add("active");
    slidesContainer.style.transform = `translateX(-${index * (100 / placeholderReviews.length)}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % placeholderReviews.length;
    updateSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + placeholderReviews.length) % placeholderReviews.length;
    updateSlide(currentIndex);
  }

  // --- Event Listeners ---
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      currentIndex = Number(e.target.dataset.index);
      updateSlide(currentIndex);
    }
  });

  // --- Auto Slide ---
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // 5s per slide
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  reviewSlider.addEventListener("mouseenter", stopAutoSlide);
  reviewSlider.addEventListener("mouseleave", startAutoSlide);

  // --- Init ---
  renderSlides(placeholderReviews);
  updateSlide(currentIndex);
  startAutoSlide();
});

