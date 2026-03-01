/**
 * JC Cuna Portfolio - Bento Layout
 * Linear.app inspired, single viewport
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initContactForm();
    initCardDoubleClick();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.bento-card[id]');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', isExpanded);
        });
        links.forEach(l => l.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
        }));
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const id = href.slice(1);
                const target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active on scroll (for responsive when scroll exists)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id) {
                        links.forEach(l => {
                            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
                        });
                    }
                }
            });
        },
        { threshold: 0.5, rootMargin: '-80px 0px' }
    );

    cards.forEach(card => observer.observe(card));
}

function initCardDoubleClick() {
    const cards = document.querySelectorAll('.bento-card[data-href]');
    cards.forEach(card => {
        card.addEventListener('dblclick', (e) => {
            if (e.target.closest('a, button')) return;
            const href = card.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Sent ✓';
            submitBtn.style.background = 'var(--accent)';
            form.reset();
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1000);
    });
}
