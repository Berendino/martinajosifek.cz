/* =========================================
   Martina Josífek Zelínková – Mozaiky
   Main JavaScript
   ========================================= */

// ─── DOM References ─────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navHamburger = document.getElementById('navHamburger');
const galleryGrid = document.getElementById('galleryGrid');

// ─── Navbar Scroll Effect ───────────────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide scrollbar
  if (window.scrollY > 100) {
    document.documentElement.classList.add('scrollbar-visible');
  } else {
    document.documentElement.classList.remove('scrollbar-visible');
  }

  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinksAll = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ─── Mobile Menu ────────────────────────────────
navHamburger.addEventListener('click', () => {
  navHamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navHamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ─── Render Gallery ─────────────────────────────
function renderGallery(filter = 'all') {
  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  galleryGrid.innerHTML = filtered.map((product, index) => {
    return `
      <a href="product.html?id=${product.id}" class="product-card reveal reveal-delay-${(index % 4) + 1}">
        <div class="product-card-image" style="background: ${product.gradient};">
          <div class="product-card-overlay">
            <span>Zobrazit detail →</span>
          </div>
        </div>
        <div class="product-card-info">
          <h3>${product.title}</h3>
          <p>${product.shortDesc}</p>
          <span class="card-tag">${product.tag}</span>
        </div>
      </a>
    `;
  }).join('');

  initScrollAnimations();
}

// ─── Filter Buttons ─────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

// ─── Scroll Reveal Animations ───────────────────
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => {
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });
}

// ─── Initialize ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initScrollAnimations();
});
