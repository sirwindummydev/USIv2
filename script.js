// ===== NAVBAR scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(10,31,68,0.97)'
    : '#0a1f44';
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SOLUTIONS CAROUSEL =====
const track    = document.getElementById('carouselTrack');
const items    = track.querySelectorAll('.carousel-item');
let current    = 0;
const visible  = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;

function updateCarousel() {
  const w    = track.parentElement.offsetWidth;
  const vis  = visible();
  const gap  = 24;
  const itemW = (w - gap * (vis - 1)) / vis;

  items.forEach(item => { item.style.flex = `0 0 ${itemW}px`; });

  const maxIndex = Math.max(0, items.length - vis);
  current = Math.min(current, maxIndex);
  track.style.transform = `translateX(-${current * (itemW + gap)}px)`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  current = Math.max(0, current - 1);
  updateCarousel();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  const max = Math.max(0, items.length - visible());
  current = Math.min(max, current + 1);
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(
  'section, .why-list li, .solution-card, .client-logo, .cert-card'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== JOIN FORM =====
function handleJoin(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  alert(`Thank you! We'll reach out to ${input.value} soon.`);
  input.value = '';
}
