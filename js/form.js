// js/form.js

document.addEventListener('DOMContentLoaded', () => {
  initWaitlistForm();
  initContactForm();
});

/**
 * Helpers for showing/hiding modals
 */
function showModal(modal) {
  if (!modal) return;
  modal.classList.add("show");
  modal.style.display = "flex";
}

function hideModal(modal) {
  if (!modal) return;
  modal.classList.remove("show");
  modal.style.display = "none";
}

/**
 * Waitlist form logic
 * - Sends email to SheetDB API
 * - Shows success modal
 */
function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const modal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');

  if (!form) return; // ⛔ safeguard if form not on page

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;
    const agreed = form.querySelector('#agreePolicy')?.checked;
    const button = form.querySelector('button[type="submit"]');

    if (!agreed) {
      alert("Please agree to the policies before submitting.");
      return;
    }

    // Disable the form
    form.classList.add('disabled');
    button.disabled = true;
    button.innerText = 'Submitting...';

    try {
      const response = await fetch("https://sheetdb.io/api/v1/0embjmd8gjwvg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [{ email }] })
      });

      if (response.ok) {
        showModal(modal);
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

  // Close modal
  closeModal?.addEventListener('click', () => hideModal(modal));

  window.addEventListener('click', (e) => {
    if (e.target === modal) hideModal(modal);
  });
}

/**
 * Contact form logic
 * - Sends data to Formspree
 * - Shows contact success modal
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const modal = document.getElementById('contactSuccess');

  if (!form || !modal) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    button.innerText = "Versturen...";

    try {
      const res = await fetch("https://formspree.io/f/mvgaganr", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: data
      });

      if (res.ok) {
        form.reset();
        showModal(modal);

        setTimeout(() => hideModal(modal), 3000);
      } else {
        alert("Er ging iets mis. Probeer opnieuw.");
      }
    } catch (err) {
      console.error(err);
      alert("Netwerkfout. Probeer later opnieuw.");
    } finally {
      button.disabled = false;
      button.innerText = "Verstuur";
    }
  });
}
