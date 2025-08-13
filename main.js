// =============================
// main.js - App Initializer & Global Effects
// =============================

// Typewriter Effect for Hero Tagline
const typewriterPhrases = [
  'Smart solutions begin with smart models — I build both.',
  'Turning data into decisions.',
  'AI, automation, and web — all in one portfolio.'
];
let twIndex = 0, charIndex = 0, isDeleting = false;
const twElem = document.getElementById('typewriter');
function typeWriter() {
  const phrase = typewriterPhrases[twIndex];
  if (isDeleting) {
    charIndex--;
    twElem.textContent = phrase.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      twIndex = (twIndex + 1) % typewriterPhrases.length;
      setTimeout(typeWriter, 700);
    } else {
      setTimeout(typeWriter, 30);
    }
  } else {
    charIndex++;
    twElem.textContent = phrase.substring(0, charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1200);
    } else {
      setTimeout(typeWriter, 60);
    }
  }
}
if (twElem) typeWriter();

// Scroll to Top Button
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Subtle Sparkle/Particle Effect
function createHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 98 + '%';
    p.style.top = Math.random() * 90 + '%';
    p.style.animationDelay = (Math.random() * 3.5) + 's';
    container.appendChild(p);
  }
}
createHeroParticles();

// Parallax Floating Shapes
const heroShapes = document.querySelectorAll('.hero-shape');
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  heroShapes.forEach((shape, i) => {
    const factor = (i + 1) * 10;
    shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
}); 