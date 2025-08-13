// =============================
// theme.js - Dark/Light Mode
// =============================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const darkIcon = '<i class="fas fa-moon"></i>';
const lightIcon = '<i class="fas fa-sun"></i>';

function setTheme(theme) {
  body.setAttribute('data-theme', theme);
  themeToggle.innerHTML = theme === 'dark' ? lightIcon : darkIcon;
  localStorage.setItem('theme', theme);
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}); 