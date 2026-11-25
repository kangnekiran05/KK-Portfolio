/**
 * KIRAN KANGNE — Premium AI/ML Portfolio
 * Interactive Features:
 * 1. Undulating Golden Particle Wave Mesh + Floating Matrix Canvas (Scoped to Hero)
 * 2. Adaptive Sticky Navbar with Active Link Tracking & Scroll Reveal
 * 3. Mobile Navigation Drawer
 * 4. Real-time Skill Search & Filter (Matching Reference Screenshot)
 * 5. Interactive Working Contact Form (Client Validation + Mailto Trigger)
 * 6. One-Click Copy to Clipboard & Toast Notifications
 * 7. Smooth Scroll Back-To-Top
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initCinematicCanvas();
    initNavbar();
    initScrollReveal();
    initSkillSearch();
    initContactForm();
    initClipboard();
    initBackToTop();
    initHeroCardAnimations();
});

/* ==========================================================================
   1. CINEMATIC GOLDEN WAVE MESH & PARTICLE CANVAS (HERO ONLY)
   ========================================================================== */
function initCinematicCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    let particles = [];
    let waves = [];
    let animId;

    function resize() {
        const hero = document.getElementById('home');
        W = canvas.width  = hero ? hero.offsetWidth : window.innerWidth;
        H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 200));

    // Particle class for floating golden embers
    class Ember {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -Math.random() * 0.5 - 0.1;
            this.r = Math.random() * 1.8 + 0.6;
            this.alpha = Math.random() * 0.5 + 0.15;
            this.pulse = Math.random() * 0.02 + 0.005;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha += Math.sin(Date.now() * this.pulse) * 0.005;
            if (this.y < -10 || this.x < 0 || this.x > W) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.05, Math.min(0.65, this.alpha))})`;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Floating Binary Stream Bit
    class BinaryBit {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.char = Math.random() > 0.5 ? '1' : '0';
            this.speed = Math.random() * 0.5 + 0.2;
            this.alpha = Math.random() * 0.08 + 0.02;
            this.size = Math.random() * 10 + 9;
        }
        update() {
            this.y += this.speed;
            if (Math.random() < 0.01) this.char = Math.random() > 0.5 ? '1' : '0';
            if (this.y > H + 20) this.reset();
        }
        draw() {
            ctx.font = `${this.size}px 'JetBrains Mono', monospace`;
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
            ctx.fillText(this.char, this.x, this.y);
        }
    }

    const emberCount = window.innerWidth < 768 ? 35 : 75;
    const binaryCount = window.innerWidth < 768 ? 15 : 35;

    for (let i = 0; i < emberCount; i++) particles.push(new Ember());
    for (let i = 0; i < binaryCount; i++) waves.push(new BinaryBit());

    // Undulating sine wave mesh at lower portion of hero
    let step = 0;
    function drawGoldenWaves() {
        step += 0.008;
        const waveY = H * 0.60;
        const numLines = 5;

        for (let i = 0; i < numLines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            const alpha = 0.08 - i * 0.012;
            ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0.01, alpha)})`;

            for (let x = 0; x < W; x += 15) {
                const y = waveY +
                    Math.sin(x * 0.003 + step + i * 0.6) * 40 +
                    Math.cos(x * 0.002 - step * 0.8) * 22 +
                    (i * 18);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawGoldenWaves();
        waves.forEach(b => { b.update(); b.draw(); });
        particles.forEach(p => { p.update(); p.draw(); });
        animId = requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. NAVBAR SCROLL & ACTIVE LINK TRACKING
   ========================================================================== */
function initNavbar() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nl');
    const sections = document.querySelectorAll('section[id]');

    // Add .scrolled class when scrolling past hero
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        highlightActiveSection();
    }, { passive: true });

    function highlightActiveSection() {
        let scrollY = window.pageYOffset;
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                links.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-s') === id);
                });
            }
        });
    }

    // Mobile Hamburger
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close on link click
        links.forEach(l => l.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }));

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ==========================================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => observer.observe(t));
}

/* ==========================================================================
   4. REAL-TIME SKILL SEARCH (Matching Reference Screenshot)
   ========================================================================== */
function initSkillSearch() {
    const searchInput = document.getElementById('skill-search');
    const skillCards = document.querySelectorAll('.skill-ref-card');
    const noResults = document.getElementById('no-skills-found');
    if (!searchInput || !skillCards.length) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let matchCount = 0;

        skillCards.forEach(card => {
            const dataSkill = (card.getAttribute('data-skill') || '').toLowerCase();
            const textContent = card.innerText.toLowerCase();
            if (!query || dataSkill.includes(query) || textContent.includes(query)) {
                card.classList.remove('hidden');
                matchCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (noResults) {
            noResults.style.display = matchCount === 0 ? 'block' : 'none';
        }
    });
}

/* ==========================================================================
   5. CONTACT FORM (Client Validation + Mailto Trigger)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput  = document.getElementById('cf-name');
    const emailInput = document.getElementById('cf-email');
    const subjInput  = document.getElementById('cf-subj');
    const msgInput   = document.getElementById('cf-msg');
    const submitBtn  = document.getElementById('cf-submit');
    const statusBox  = document.getElementById('cf-status');

    function validate() {
        let valid = true;
        const eName = document.getElementById('e-name');
        const eEmail = document.getElementById('e-email');
        const eMsg = document.getElementById('e-msg');

        // Name
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            eName.classList.add('visible');
            valid = false;
        } else {
            nameInput.classList.remove('invalid');
            eName.classList.remove('visible');
        }

        // Email
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            eEmail.classList.add('visible');
            valid = false;
        } else {
            emailInput.classList.remove('invalid');
            eEmail.classList.remove('visible');
        }

        // Message
        if (msgInput.value.trim().length < 10) {
            msgInput.classList.add('invalid');
            eMsg.classList.add('visible');
            valid = false;
        } else {
            msgInput.classList.remove('invalid');
            eMsg.classList.remove('visible');
        }

        return valid;
    }

    [nameInput, emailInput, msgInput].forEach(el => {
        if (!el) return;
        el.addEventListener('input', () => {
            el.classList.remove('invalid');
            const targetErr = el.id === 'cf-name' ? 'e-name' : (el.id === 'cf-email' ? 'e-email' : 'e-msg');
            document.getElementById(targetErr)?.classList.remove('visible');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validate()) return;

        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpin = submitBtn.querySelector('.btn-spin');
        btnText.style.display = 'none';
        btnSpin.style.display = 'inline-flex';
        submitBtn.disabled = true;

        const name    = nameInput.value.trim();
        const email   = emailInput.value.trim();
        const subject = subjInput?.value.trim() || 'AI/ML Engineering Opportunity';
        const message = msgInput.value.trim();

        const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:kangnekiran05@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        setTimeout(() => {
            btnText.style.display = 'inline-flex';
            btnSpin.style.display = 'none';
            submitBtn.disabled = false;

            window.location.href = mailtoLink;

            statusBox.textContent = '✓ Opening your email client to send message to kangnekiran05@gmail.com!';
            statusBox.className = 'cf-status success';
            statusBox.style.display = 'block';

            form.reset();
            setTimeout(() => { statusBox.style.display = 'none'; }, 6000);
        }, 800);
    });
}

/* ==========================================================================
   6. ONE-CLICK CLIPBOARD COPY & TOAST
   ========================================================================== */
function initClipboard() {
    document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(text);
                showToast(`✓ Copied: ${text}`);
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-check';
                    setTimeout(() => { icon.className = 'fa-regular fa-copy'; }, 2000);
                }
            } catch {
                showToast('Unable to auto-copy. Please copy manually.');
            }
        });
    });
}

let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const btt = document.getElementById('btt');
    if (!btt) return;

    window.addEventListener('scroll', () => {
        btt.classList.toggle('visible', window.scrollY > 450);
    }, { passive: true });

    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   8. HERO CARDS STAGGER ENTRANCE
   ========================================================================== */
function initHeroCardAnimations() {
    const cards = document.querySelectorAll('.hcard');
    cards.forEach((c, idx) => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(24px)';
        setTimeout(() => {
            c.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
        }, 350 + idx * 80);
    });
}

/* Helper debounce */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
