// =============================
// email.js - Contact Form Logic
// =============================

// EmailJS integration
(function() {
  // Load EmailJS SDK
  if (!window.emailjs) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    script.onload = function() {
      emailjs.init('6GmmVw7slaOD4_M-J');
    };
    document.head.appendChild(script);
  } else {
    emailjs.init('6GmmVw7slaOD4_M-J');
  }
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = this;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };
  // Send email via EmailJS
  emailjs.send('service_24x0jp5', 'template_rmjmvwj', formData)
    .then(function(response) {
      // Show interactive popup
      form.style.display = 'none';
      const successDiv = document.getElementById('contact-success');
      successDiv.style.display = 'flex';
      successDiv.querySelector('div:last-child').textContent = 'Thank you! Your message has been sent.';
      setTimeout(() => {
        successDiv.style.display = 'none';
        form.reset();
        form.style.display = 'flex';
      }, 3000);
    }, function(error) {
      // Show error popup
      form.style.display = 'none';
      const successDiv = document.getElementById('contact-success');
      successDiv.style.display = 'flex';
      successDiv.querySelector('div:last-child').textContent = 'Sorry, there was an error sending your message. Please try again later.';
      successDiv.querySelector('.success-icon').innerHTML = '<i class="fas fa-times-circle" style="color:#e11d48"></i>';
      setTimeout(() => {
        successDiv.style.display = 'none';
        form.style.display = 'flex';
      }, 3000);
      console.error('EmailJS error:', error);
    });
}); 