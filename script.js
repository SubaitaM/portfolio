  /* ─────────────────────────────────────────
     NAVBAR — scroll shadow
  ───────────────────────────────────────── */
  (function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  })();
  
  
  /* ─────────────────────────────────────────
     HERO PARALLAX — content fades out on scroll
  ───────────────────────────────────────── */
  (function initHeroParallax() {
    const content = document.getElementById('hero-content');
    if (!content) return;
    window.addEventListener('scroll', () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
      content.style.transform = `translateY(${progress * 45}px)`;
      content.style.opacity   = 1 - progress;
    }, { passive: true });
  })();
  
  
  /* ─────────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────────── */
  (function initScrollReveal() {
    const els = document.querySelectorAll('.animate-on-scroll');
    if (!els.length) return;
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.style.animationDelay || '0') * 1000 || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    els.forEach(el => observer.observe(el));
  })();