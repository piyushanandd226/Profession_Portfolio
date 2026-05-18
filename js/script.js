const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navBackdrop = document.getElementById('nav-backdrop');
const scrollProgressBar = document.getElementById('scroll-progress-bar');
const backToTop = document.getElementById('back-to-top');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toastEl) return;
  window.clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.hidden = false;
  requestAnimationFrame(() => {
    toastEl.classList.add('is-visible');
  });
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove('is-visible');
    window.setTimeout(() => {
      toastEl.hidden = true;
      toastEl.textContent = '';
    }, 320);
  }, 2600);
}

function isMobileNav() {
  return window.matchMedia('(max-width: 768px)').matches;
}


// 1. Create the element
const navLinksUl = document.createElement('ul');

// 2. Set the ID and classes
navLinksUl.id = 'nav-links';
// Note: 'isOpen' must be defined (e.g., let isOpen = false;)
if (typeof isOpen !== 'undefined' && isOpen) {
  navLinksUl.classList.add('show');
}

// 3. Append to a parent container (e.g., a <nav> element)
const navContainer = document.querySelector('nav');
if (navContainer) {
  navContainer.appendChild(navLinksUl);
}


/**
 * Main function to control the menu state
 * @param {boolean} open - Whether to open or close the menu
 */
function setMenuOpen(open) {
  if (!hamburger || !navLinks) return;

  // 1. Update button attributes and animation class
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  hamburger.classList.toggle('is-open', open);

  // 2. Toggle the menu visibility class
  navLinks.classList.toggle('show', open);

  // 3. Optional: Handle backdrop if it exists
  if (navBackdrop) {
    navBackdrop.classList.toggle('is-visible', open && isMobileNav());
  }

  // 4. Prevent scrolling on the body when menu is open (mobile only)
  document.body.classList.toggle('menu-open', open && isMobileNav());
}

// Keep this part!
hamburger.addEventListener('click', () => {
  const isCurrentlyOpen = navLinks.classList.contains('show');
  setMenuOpen(!isCurrentlyOpen);
});
// Event Listener: Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  const isCurrentlyOpen = navLinks.classList.contains('show');
  setMenuOpen(!isCurrentlyOpen);
});

// Event Listener: Close menu when clicking a navigation link
document.querySelectorAll('#nav-links a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

// Event Listener: Close menu on 'Escape' key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('show')) {
    setMenuOpen(false);
    hamburger.focus();
  }
});

// Event Listener: Close menu if window is resized beyond mobile width
window.addEventListener('resize', () => {
  if (!isMobileNav() && navLinks.classList.contains('show')) {
    setMenuOpen(false);
  }
});

document.querySelector('.skip-link')?.addEventListener('click', () => {
  window.requestAnimationFrame(() => {
    const main = document.getElementById('main-content');
    if (main) main.focus({ preventScroll: true });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  });
});

let lastScrollTop = 0;
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('header nav ul li a');

let progressRaf = 0;
const updateScrollProgress = () => {
  progressRaf = 0;
  if (!scrollProgressBar) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const p = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollProgressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
};

function updateActiveNav() {
  const headerOffset = 110;
  const scrollPos = window.scrollY + headerOffset;
  let current = 'home';
  const list = Array.from(sections);

  for (let i = list.length - 1; i >= 0; i -= 1) {
    const section = list[i];
    const id = section.getAttribute('id');
    if (!id) continue;
    if (scrollPos >= section.offsetTop) {
      current = id;
      break;
    }
  }

  navItems.forEach((item) => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
    const href = item.getAttribute('href');
    if (href && href.startsWith('#') && href.slice(1) === current) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
  });
}

let scrollTicking = false;
function onWindowScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (header) {
    if (!prefersReducedMotion && scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    if (scrollTop > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.96)';
      header.style.boxShadow = '0 8px 30px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.background = '';
      header.style.boxShadow = '';
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  if (!progressRaf) {
    progressRaf = window.requestAnimationFrame(updateScrollProgress);
  }

  updateActiveNav();

  if (backToTop) {
    const show = scrollTop > 420;
    backToTop.classList.toggle('is-visible', show);
    backToTop.hidden = !show;
  }

  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    window.requestAnimationFrame(onWindowScroll);
  }
});
onWindowScroll();
updateScrollProgress();

backToTop?.addEventListener('click', () => {
  const home = document.getElementById('home');
  if (home) {
    home.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
});

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy');
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Email copied to clipboard.');
    } catch {
      showToast('Copy not supported in this browser.');
    }
  });
});

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

function revealOnScroll(targets, staggerMs = 0) {
  if (prefersReducedMotion) {
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  targets.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.65s ease-out ${index * staggerMs}s, transform 0.65s ease-out ${index * staggerMs}s`;
    io.observe(el);
  });
}

revealOnScroll(document.querySelectorAll('section'), 0);
revealOnScroll(document.querySelectorAll('.experience-item'), 0.08);

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectEmpty = document.getElementById('project-empty');
const projectLive = document.getElementById('project-live');

const filterLabels = {
  all: 'All',
  backend: 'Backend',
  cloud: 'Cloud',
  data: 'Data',
};

function applyProjectFilter(button) {
  filterButtons.forEach((btn) => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');

  const filter = (button.dataset.filter || 'all').toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const raw = card.getAttribute('data-categories') || '';
    const categories = raw.toLowerCase().split(/\s+/).filter(Boolean);
    const visible = filter === 'all' || categories.includes(filter);
    card.toggleAttribute('hidden', !visible);
    if (visible) visibleCount += 1;
  });

  if (projectEmpty) {
    projectEmpty.hidden = visibleCount > 0;
  }

  const label = filterLabels[filter] || filter;
  const msg =
    filter === 'all'
      ? `Showing all ${visibleCount} projects.`
      : visibleCount === 0
        ? 'No projects match this filter.'
        : `${visibleCount} project${visibleCount === 1 ? '' : 's'} tagged ${label}.`;

  if (projectLive) projectLive.textContent = msg;
  if (visibleCount === 0) {
    showToast('No projects match this filter.');
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => applyProjectFilter(button));
});
