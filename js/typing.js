// js/typing.js
document.addEventListener("DOMContentLoaded", () => {
  const text = "Guiding Your Next Ride";
  let i = 0;
  const speed = 100;
  const target = document.getElementById("typing-text");

  function typeWriter() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});
