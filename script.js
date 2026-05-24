/**
 * ============================================================
 * NGUYỄN VĂN QUÝ — Civil Engineer Portfolio
 * script.js — Main JavaScript
 * Version: 2.0 | Last updated: 2025
 * ============================================================
 */

'use strict';

/* ============================================================
   1. PRELOADER
   ============================================================ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    // Small delay for dramatic effect
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remove from DOM after transition
      preloader.addEventListener('transitionend', () => {
        preloader.remove();
      }, { once: true });
    }, 1800);
  });
})();

/* ============================================================
   2. DOM READY INITIALIZER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTypingAnimation();
  initParticles();
  initCounterAnimation();
  initScrollAnimations();
  initSkillBars();
  initProjectFilter();
  initGalleryLightbox();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initActiveNavHighlight();
});

/* ============================================================
   3. NAVBAR — Sticky on scroll + active state
   ============================================================ */
function initNavbar() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add scrolled class for glass effect
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });
}

/* ============================================================
   4. MOBILE MENU — Toggle open/close
   ============================================================ */
function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const overlay     = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ============================================================
   5. TYPING ANIMATION — Hero section
   ============================================================ */
function initTypingAnimation() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const phrases = [
    'Kỹ Sư Xây Dựng',
    'Chuyên Gia QLDA',
    'BIM Manager',
    'Giảng Viên Xây Dựng',
    'Chuyên Gia Thi Công',
    'Tư Vấn Kỹ Thuật'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  function typeChar() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Pause at end of phrase
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
        }, 2000);
      } else {
        setTimeout(typeChar, 80);
      }
    } else {
      // Deleting
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeChar, 400);
      } else {
        setTimeout(typeChar, 40);
      }
    }
  }

  // Start after a brief delay
  setTimeout(typeChar, 800);
}

/* ============================================================
   6. PARTICLE SYSTEM — Hero floating particles
   ============================================================ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size    = Math.random() * 4 + 2;
    const left    = Math.random() * 100;
    const delay   = Math.random() * 15;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.6 + 0.2;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${opacity};
    `;

    container.appendChild(particle);
  }
}

/* ============================================================
   7. COUNTER ANIMATION — Hero stats
   ============================================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  let hasRun = false;

  function runCounters() {
    counters.forEach(counter => {
      const target   = parseInt(counter.dataset.target, 10);
      const duration = 2000;
      const step     = target / (duration / 16);
      let current    = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Run when hero is in view
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        setTimeout(runCounters, 500);
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(heroSection);
}

/* ============================================================
   8. SCROLL ANIMATIONS — AOS-like reveal
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  // Apply stagger delays based on data-aos-delay attribute
  elements.forEach(el => {
    const delay = el.dataset.aosDelay;
    if (delay) {
      el.style.transitionDelay = parseInt(delay) + 'ms';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   9. SKILL BARS — Animated progress bars
   ============================================================ */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;

        skillFills.forEach((fill, index) => {
          const width = fill.dataset.width;
          setTimeout(() => {
            fill.style.width = width + '%';
          }, index * 120);
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* ============================================================
   10. PROJECT FILTER — Category filtering
   ============================================================ */
function initProjectFilter() {
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || filter === category) {
          card.classList.remove('hidden');
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';

          // Animate back in
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity    = '1';
              card.style.transform  = 'translateY(0)';
            }, 50);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================================
   11. GALLERY LIGHTBOX — Image viewer
   ============================================================ */
function initGalleryLightbox() {
  const galleryItems  = document.querySelectorAll('.gallery-item');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCap   = document.getElementById('lightboxCaption');
  const lightboxCnt   = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');
  const overlay       = document.getElementById('lightboxOverlay');

  if (!lightbox || !galleryItems.length) return;

  let currentIndex = 0;

  // Collect all gallery images
  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('.gallery-img');
    return {
      src:     img.dataset.full || img.src,
      caption: img.dataset.caption || img.alt,
      alt:     img.alt
    };
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = images[currentIndex];
    lightboxImg.style.opacity = '0';

    setTimeout(() => {
      lightboxImg.src     = item.src;
      lightboxImg.alt     = item.alt;
      lightboxCap.textContent = item.caption;
      lightboxCnt.textContent = `${currentIndex + 1} / ${images.length}`;

      lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
      };
    }, 200);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  // Event listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    switch (e.key) {
      case 'Escape':      closeLightbox(); break;
      case 'ArrowLeft':   prevImage();     break;
      case 'ArrowRight':  nextImage();     break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX   = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  }, { passive: true });
}

/* ============================================================
   12. CONTACT FORM — Validation & Submit handler
   ============================================================ */
function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#dc2626';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!isValid) {
      // Shake animation
      form.style.animation = 'none';
      requestAnimationFrame(() => {
        form.style.animation = 'shake 0.4s ease';
      });
      return;
    }

    // Simulate sending
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled  = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi Tin Nhắn';
      submitBtn.disabled  = false;

      // Show success message
      success.classList.add('show');
      form.reset();

      // Hide after 5 seconds
      setTimeout(() => {
        success.classList.remove('show');
      }, 5000);
    }, 1500);
  });

  // Add shake animation keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-8px); }
      80%       { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   13. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   14. SMOOTH SCROLL — For anchor links
   ============================================================ */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
}

/* ============================================================
   15. ACTIVE NAV LINK HIGHLIGHT — On scroll
   ============================================================ */
function initActiveNavHighlight() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const headerHeight = 100;

  function updateActiveNav() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop    = section.offsetTop - headerHeight;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = '#' + section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // Run once on load
}

/* ============================================================
   16. OPTIONAL: Service Worker for PWA (future enhancement)
   ============================================================ */
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js').catch(console.error);
// }

/* ============================================================
   17. CONSOLE BRANDING
   ============================================================ */
console.log(
  '%c⚙ NGUYỄN VĂN QUÝ %c Civil Engineer & Project Manager ',
  'background:#1a3a6b;color:#fff;padding:6px 12px;font-size:14px;font-weight:bold;border-radius:4px 0 0 4px;',
  'background:#dc2626;color:#fff;padding:6px 12px;font-size:14px;font-weight:bold;border-radius:0 4px 4px 0;'
);
console.log('%cPortfolio Website v2.0 | Built with ❤ for excellence', 'color:#2563eb;font-size:12px;');
