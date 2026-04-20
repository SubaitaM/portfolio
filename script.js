/* ─────────────────────────────────────────
   PARTICLE CANVAS — floating dust (hero only)
───────────────────────────────────────── */
(function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  
    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
  
    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2,
      baseOpacity: Math.random() * 0.55 + 0.08,
      speed: Math.random() * 0.35 + 0.08,
      drift: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
    }));
  
    function drawParticleCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        p.phase += 0.012;
  
        if (p.y < -4) p.y = canvas.height + 4;
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
  
        const opacity = p.baseOpacity * (0.65 + 0.35 * Math.sin(p.phase));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grad.addColorStop(0, `rgba(255,255,255,${opacity})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
  
      requestAnimationFrame(drawParticleCanvas);
    }
    drawParticleCanvas();
  })();
  
  
  /* ─────────────────────────────────────────
     PARTICLE TITLE — canvas typography
  ───────────────────────────────────────── */
  (function initParticleTitle() {
    const canvas = document.getElementById('particle-title');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  
    // ── EDIT YOUR HEADLINE HERE ──────────────────────────────
    const LINE1 = 'Subaita';
    const LINE2 = 'Mamun';
    // ─────────────────────────────────────────────────────────
  
    const REPEL_RADIUS   = 90;
    const REPEL_STRENGTH = 7;
    const SPRING         = 0.055;
    const FRICTION       = 0.82;
  
    let mouse = { x: -9999, y: -9999 };
    let pts   = [];
    let running = false;
    let raf;
  
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  
    function buildParticles() {
      const W = canvas.offsetWidth;
      const H = 230;
      canvas.width  = W;
      canvas.height = H;
  
      const fontSize = Math.min(W * 0.086, 90);
      const leading  = fontSize * 1.08;
  
      // offscreen render
      const off = document.createElement('canvas');
      off.width  = W;
      off.height = H;
      const octx = off.getContext('2d');
      octx.fillStyle = 'black';
      octx.font = `700 italic ${fontSize}px 'Instrument Serif'`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(LINE1, W / 2, H / 2 - leading * 0.5);
      octx.fillText(LINE2, W / 2, H / 2 + leading * 0.5);
  
      const imageData = octx.getImageData(0, 0, W, H).data;
      const targets = [];
      const stride = 3;
      for (let y = 0; y < H; y += stride) {
        for (let x = 0; x < W; x += stride) {
          const a = imageData[(y * W + x) * 4 + 3];
          if (a > 100) targets.push({ x, y });
        }
      }
  
      pts = targets.map(t => {
        const fromBottom = Math.random() > 0.5;
        return {
          x: Math.random() * W,
          y: fromBottom ? H + 20 + Math.random() * 60 : -(20 + Math.random() * 60),
          tx: t.x,
          ty: t.y,
          vx: 0,
          vy: 0,
          r: Math.random() * 0.85 + 0.45,
          opacity: 0,
          phase: Math.random() * Math.PI * 2,
          settled: false,
        };
      });
  
      if (!running) { running = true; tick(); }
    }
  
    function tick() {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      pts.forEach(p => {
        // repel
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const factor = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * factor;
          p.vy += (dy / dist) * factor;
        }
  
        // spring
        p.vx += (p.tx - p.x) * SPRING;
        p.vy += (p.ty - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
  
        p.x += p.vx;
        p.y += p.vy;
  
        const nearTarget = Math.abs(p.x - p.tx) < 2 && Math.abs(p.y - p.ty) < 2;
        p.settled = nearTarget && Math.abs(p.vx) < 0.15 && Math.abs(p.vy) < 0.15;
  
        if (p.settled) {
          p.phase += 0.015;
          p.x = p.tx + Math.sin(p.phase) * 0.5;
          p.y = p.ty + Math.cos(p.phase * 0.7) * 0.4;
        }
  
        if (p.opacity < 1) p.opacity = Math.min(1, p.opacity + 0.022);
  
        // near-cursor glow
        if (dist < REPEL_RADIUS && dist > 0) {
          const nearFactor = 1 - dist / REPEL_RADIUS;
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          glowGrad.addColorStop(0, `rgba(0,0,0,${nearFactor * 0.35 * p.opacity})`);
          glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${Math.min(1, p.opacity * 1.2)})`;
        ctx.fill();
      });
    }
  
    document.fonts.load(`italic 80px 'Instrument Serif'`).then(buildParticles);
  
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(raf);
        running = false;
        buildParticles();
      }, 200);
    });
  })();
  
  
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