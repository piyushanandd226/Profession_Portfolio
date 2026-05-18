document.addEventListener('DOMContentLoaded', () => {
  // Use a MutationObserver to wait for React to render the elements
  const observer = new MutationObserver((mutations, obs) => {
    const hamburger = document.getElementById('hamburger');
    
    // Once #hamburger exists, initialize everything
    if (hamburger) {
      initAll();
      obs.disconnect();
    }
  });

  observer.observe(document.getElementById('root') || document.body, {
    childList: true,
    subtree: true
  });
});

function initAll() {
  // --- Select Elements ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navBackdrop = document.getElementById('nav-backdrop');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const backToTop = document.getElementById('back-to-top');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toastEl = document.getElementById('toast');
  let toastTimer;

  // --- Functions ---
  function showToast(message) {
    if (!toastEl) return;
    window.clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('is-visible'));
    toastTimer = window.setTimeout(() => {
      toastEl.classList.remove('is-visible');
      window.setTimeout(() => { toastEl.hidden = true; toastEl.textContent = ''; }, 320);
    }, 2600);
  }

  const isMobileNav = () => window.matchMedia('(max-width: 768px)').matches;

  function setMenuOpen(open) {
    if (!hamburger || !navLinks) return;
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    hamburger.classList.toggle('is-open', open);
    navLinks.classList.toggle('show', open);
    if (navBackdrop) navBackdrop.classList.toggle('is-visible', open && isMobileNav());
    document.body.classList.toggle('menu-open', open && isMobileNav());
  }

  // --- Event Listeners ---
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isCurrentlyOpen = navLinks?.classList.contains('show');
      setMenuOpen(!isCurrentlyOpen);
    });
  }

  document.querySelectorAll('#nav-links a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('show')) {
      setMenuOpen(false);
      hamburger?.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobileNav() && navLinks?.classList.contains('show')) {
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

  // --- Scroll Logic ---
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
    const scrollPos = window.scrollY + 110;
    let current = 'home';
    sections.forEach((section) => {
      const id = section.getAttribute('id');
      if (id && scrollPos >= section.offsetTop) current = id;
    });
    navItems.forEach((item) => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href?.slice(1) === current) item.classList.add('active');
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
      header.style.background = scrollTop > 50 ? 'rgba(255, 255, 255, 0.96)' : '';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    if (!progressRaf) progressRaf = window.requestAnimationFrame(updateScrollProgress);
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

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  // --- Copy Buttons ---
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        await navigator.clipboard.writeText(text);
        showToast('Email copied to clipboard.');
      }
    });
  });
js
function initRevealAnimations() {
  // 1. Setup the Observer
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once it's revealed, we don't need to watch it anymore
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 2. Automatically add 'reveal' class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    // Skip the 'home' section if you want it visible immediately
    if (section.id !== 'home') {
      section.classList.add('reveal');
      revealObserver.observe(section);
    }
  });

  // 3. Staggered reveal for Experience Items
  const experienceItems = document.querySelectorAll('.experience-item');
  experienceItems.forEach((item, index) => {
    item.classList.add('reveal');
    // Add a delay based on the item's index for a "wave" effect
    item.style.transitionDelay = `${(index % 3) * 0.05}s`; 
    revealObserver.observe(item);
  });
}

// Ensure this is called after React has rendered
// (Put this inside your existing init() function)
initRevealAnimations();
  // Run initial checks
  onWindowScroll();
}
