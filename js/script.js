// =====================================
// DOM Elements
// =====================================

const scrollProgressBar = document.getElementById('scroll-progress-bar');
const backToTop = document.getElementById('back-to-top');

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const toastEl = document.getElementById('toast');

let toastTimer = null;


// =====================================
// Toast Notification
// =====================================

function showToast(message) {

  if (!toastEl) return;

  clearTimeout(toastTimer);

  toastEl.textContent = message;

  toastEl.hidden = false;

  requestAnimationFrame(() => {
    toastEl.classList.add('is-visible');
  });

  toastTimer = setTimeout(() => {

    toastEl.classList.remove('is-visible');

    setTimeout(() => {

      toastEl.hidden = true;
      toastEl.textContent = '';

    }, 300);

  }, 2500);
}


// =====================================
// Skip Link Accessibility
// =====================================

document
  .querySelector('.skip-link')
  ?.addEventListener('click', () => {

    requestAnimationFrame(() => {

      const main = document.getElementById('main-content');

      if (main) {
        main.focus({ preventScroll: true });
      }
    });
  });


// =====================================
// Smooth Scrolling
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', function (e) {

    const href = this.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  });
});


// =====================================
// Header + Navigation
// =====================================

const header = document.querySelector('header');

const sections = document.querySelectorAll('section[id]');

const navItems = document.querySelectorAll('#nav-links a');

let lastScrollTop = 0;

function updateActiveNav() {

  let current = 'home';

  const scrollPosition = window.scrollY + 120;

  sections.forEach(section => {

    if (scrollPosition >= section.offsetTop) {
      current = section.id;
    }
  });

  navItems.forEach(item => {

    item.classList.remove('active');
    item.removeAttribute('aria-current');

    const href = item.getAttribute('href');

    if (href === `#${current}`) {

      item.classList.add('active');

      item.setAttribute('aria-current', 'page');
    }
  });
}


// =====================================
// Scroll Progress
// =====================================

function updateScrollProgress() {

  if (!scrollProgressBar) return;

  const doc = document.documentElement;

  const scrollableHeight =
    doc.scrollHeight - doc.clientHeight;

  const progress =
    scrollableHeight > 0
      ? window.scrollY / scrollableHeight
      : 0;

  scrollProgressBar.style.transform =
    `scaleX(${progress})`;
}


// =====================================
// Scroll Handler
// =====================================

function handleScroll() {

  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop;

  // Header animation
  if (header) {

    if (
      !prefersReducedMotion &&
      scrollTop > lastScrollTop &&
      scrollTop > 100
    ) {

      header.style.transform = 'translateY(-100%)';

    } else {

      header.style.transform = 'translateY(0)';
    }

    // Header shadow
    if (scrollTop > 50) {

      header.classList.add('scrolled');

    } else {

      header.classList.remove('scrolled');
    }
  }

  lastScrollTop = Math.max(scrollTop, 0);

  updateScrollProgress();

  updateActiveNav();

  // Back to top button
  if (backToTop) {

    const visible = scrollTop > 400;

    backToTop.classList.toggle(
      'is-visible',
      visible
    );

    backToTop.hidden = !visible;
  }
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(handleScroll);
});

handleScroll();


// =====================================
// Back To Top
// =====================================

backToTop?.addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion
      ? 'auto'
      : 'smooth'
  });
});


// =====================================
// Copy Buttons
// =====================================

document.querySelectorAll('.copy-btn').forEach(btn => {

  btn.addEventListener('click', async () => {

    const text = btn.dataset.copy;

    if (!text) return;

    try {

      await navigator.clipboard.writeText(text);

      showToast('Copied to clipboard');

    } catch {

      showToast('Clipboard not supported');
    }
  });
});


// =====================================
// Reveal Animations
// =====================================

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

function revealOnScroll(targets, stagger = 0) {

  if (prefersReducedMotion) {

    targets.forEach(el => {

      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = '1';

          entry.target.style.transform =
            'translateY(0)';
        }
      });

    },
    observerOptions
  );

  targets.forEach((el, index) => {

    el.style.opacity = '0';

    el.style.transform =
      'translateY(30px)';

    el.style.transition =
      `all 0.6s ease ${index * stagger}s`;

    observer.observe(el);
  });
}

revealOnScroll(
  document.querySelectorAll('section'),
  0
);

revealOnScroll(
  document.querySelectorAll('.experience-item'),
  0.08
);


// =====================================
// Project Filters
// =====================================

const filterButtons =
  document.querySelectorAll('.filter-btn');

const projectCards =
  document.querySelectorAll('.project-card');

const projectEmpty =
  document.getElementById('project-empty');

const projectLive =
  document.getElementById('project-live');

function applyProjectFilter(button) {

  filterButtons.forEach(btn => {

    btn.classList.remove('active');

    btn.setAttribute('aria-pressed', 'false');
  });

  button.classList.add('active');

  button.setAttribute('aria-pressed', 'true');

  const filter =
    button.dataset.filter || 'all';

  let visibleCount = 0;

  projectCards.forEach(card => {

    const categories =
      (card.dataset.categories || '')
        .toLowerCase()
        .split(' ');

    const visible =
      filter === 'all' ||
      categories.includes(filter);

    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  if (projectEmpty) {
    projectEmpty.hidden = visibleCount > 0;
  }

  if (projectLive) {

    projectLive.textContent =
      `Showing ${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;
  }
}

filterButtons.forEach(button => {

  button.addEventListener('click', () => {
    applyProjectFilter(button);
  });
});
