document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlist-form');
  const modal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = form.querySelector('input[type="email"]').value;
    const agreed = form.querySelector('#agreePolicy').checked;
    const button = form.querySelector('button[type="submit"]');
  
    if (!agreed) {
      alert("Please agree to the policies before submitting.");
      return;
    }
  
    // Disable the form and show loading
    form.classList.add('disabled');
    button.disabled = true;
    button.innerText = 'Submitting...';
  
    try {
      const response = await fetch("https://sheetdb.io/api/v1/0embjmd8gjwvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: [{ email }] })
      });
  
      if (response.ok) {
        modal.classList.add('show');
        form.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      // Re-enable form
      form.classList.remove('disabled');
      button.disabled = false;
      button.innerText = 'Join the Waitlist';
    }
  });
  

  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const modal = document.getElementById('contactSuccess');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const formObject = Object.fromEntries(data.entries());

    try {
      const res = await fetch("https://formspree.io/f/mvgaganr", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: data
      });

      if (res.ok) {
        form.reset();
        modal.style.display = 'flex';
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
    }
  });
});

