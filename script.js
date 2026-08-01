// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
function toggleMenu() { navLinksEl.classList.toggle('open'); }
hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); });
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));

// ===== Active nav link + scroll progress vine =====
const sections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const vineFill = document.getElementById('vineFill');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (vineFill) vineFill.style.height = pct + '%';
}, { passive: true });

// ===== Skill bar animation on scroll into view =====
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.getAttribute('data-width') + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => barObserver.observe(bar));

// ===== Generic reveal-on-scroll for cards/sections =====
const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .service-card, .why-item, .education-card, .about-text'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// ===== Contact form =====
// Tries the Node.js/Express + MongoDB backend first (server/server.js).
// If that server isn't running, it falls back to opening the visitor's
// email app instead, so the form always works either way.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

// Same origin when served by Express (e.g. http://localhost:5000),
// or your deployed API URL if the frontend and backend are hosted separately.
const API_BASE = window.location.origin.startsWith('http') && window.location.protocol !== 'file:'
  ? ''
  : 'http://localhost:5000';

function openMailFallback(name, email, subject, message) {
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
  const mailto = `mailto:Shreyaa.Gardi09@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailto;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Portfolio contact';
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in your name, email, and message.';
    formStatus.style.color = '#E1729E';
    return;
  }

  formStatus.textContent = 'Sending...';
  formStatus.style.color = '#6E4A9E';

  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (!response.ok) throw new Error('Server responded with an error');
    const result = await response.json();

    if (result.success) {
      formStatus.textContent = 'Message sent successfully — thank you!';
      formStatus.style.color = '#3B2354';
      contactForm.reset();
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (err) {
    // Backend not running / unreachable — fall back to email client
    formStatus.textContent = 'Could not reach the server — opening your email app instead...';
    formStatus.style.color = '#6E4A9E';
    openMailFallback(name, email, subject, message);
  }
});
