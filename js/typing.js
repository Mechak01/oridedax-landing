// js/typing.js

document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.tagline');
    const text = "Guiding your next ride.";
    let i = 0;
  
    function typeChar() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 50); // speed
      }
    }
  
    // Clear initially (optional)
    tagline.textContent = '';
    typeChar();
  });
  