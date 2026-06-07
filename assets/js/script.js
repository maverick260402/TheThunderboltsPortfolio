// Tailwind CSS Configuration
// Brand color names are repointed to neutral fallbacks; the real, theme-aware
// styling lives in styles.css (which overrides these with !important).
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'mono': ['Inter', 'sans-serif'],
                'sans': ['Inter', 'sans-serif'],
            },
            colors: {
                'matrix-green': '#1d1d1f',
                'terminal-blue': '#1d1d1f',
                'code-purple': '#1d1d1f',
                'syntax-orange': '#1d1d1f',
                'error-red': '#dc2626',
                'dark-bg': '#0a0a0b',
                'dark-surface': '#161619',
                'dark-border': '#21262d',
                'light-bg': '#ffffff',
                'light-surface': '#ffffff',
                'light-border': '#e5e5e7',
                'light-text': '#1d1d1f',
                'light-text-secondary': '#515154'
            },
            animation: {
                'slide-up': 'slideUp 0.8s ease-out',
                'fade-in': 'fadeIn 1s ease-out'
            }
        }
    }
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme switching functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('themeSwitch');
    const mobileThemeSwitch = document.getElementById('mobileThemeSwitch');
    const lightLabel = document.getElementById('lightLabel');
    const darkLabel = document.getElementById('darkLabel');
    const mobileLightLabel = document.getElementById('mobileLightLabel');
    const mobileDarkLabel = document.getElementById('mobileDarkLabel');

    // Check for saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Function to update switch position and labels
    function updateSwitch(theme) {
        const isLight = theme === 'light';
        themeSwitch?.classList.toggle('light', isLight);
        mobileThemeSwitch?.classList.toggle('light', isLight);
        lightLabel?.classList.toggle('active', isLight);
        darkLabel?.classList.toggle('active', !isLight);
        mobileLightLabel?.classList.toggle('active', isLight);
        mobileDarkLabel?.classList.toggle('active', !isLight);
    }

    // Apply initial theme to both html and body
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    updateSwitch(currentTheme);

    // Function to toggle theme
    function toggleTheme() {
        const active = document.documentElement.getAttribute('data-theme');
        const newTheme = active === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateSwitch(newTheme);
    }

    themeSwitch?.addEventListener('click', toggleTheme);
    mobileThemeSwitch?.addEventListener('click', toggleTheme);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('mobile-menu-hidden');
        }, 10);
    });

    function closeMenu() {
        mobileMenu.classList.add('mobile-menu-hidden');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 320);
    }

    closeMobileMenu?.addEventListener('click', closeMenu);
    mobileMenuOverlay?.addEventListener('click', closeMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}

// Dropdown menu functionality
function initDropdowns() {
    // Desktop dropdown
    const dropdownBtn = document.getElementById('ourWorkDropdown');
    const dropdownMenu = document.getElementById('ourWorkMenu');
    const dropdownArrow = dropdownBtn?.querySelector('.dropdown-arrow');

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            dropdownMenu.classList.toggle('hidden');
            dropdownArrow?.classList.toggle('rotate');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.classList.remove('show');
                dropdownArrow?.classList.remove('rotate');
            }
        });
    }

    // Mobile projects list toggle
    const mobileDropdownBtn = document.getElementById('mobileOurWorkDropdown');
    const mobileProjectsList = document.getElementById('mobileOurWorkMenu');
    const mobileDropdownArrow = mobileDropdownBtn?.querySelector('.mobile-dropdown-arrow');

    if (mobileDropdownBtn && mobileProjectsList) {
        mobileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileProjectsList.classList.toggle('show');
            mobileDropdownArrow?.classList.toggle('rotate');
        });

        document.addEventListener('click', (e) => {
            if (!mobileDropdownBtn.contains(e.target) && !mobileProjectsList.contains(e.target)) {
                mobileProjectsList.classList.remove('show');
                mobileDropdownArrow?.classList.remove('rotate');
            }
        });

        mobileProjectsList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileProjectsList.classList.remove('show');
                mobileDropdownArrow?.classList.remove('rotate');
            });
        });
    }
}

// Scroll-reveal: buttery rise + fade + scale as elements enter the viewport.
// Auto-tags a curated set of elements (no HTML changes needed) and staggers
// siblings within the same container for a Xaneur-style cascade.
function initScrollReveal() {
    // Elements that should animate in. Pipeline steps have their own handler.
    const selectors = [
        '.section-label',
        'section h1', 'section h2',
        '.hero-sub', '.hero-cta',
        '.capability-card', '.benefit-card',
        '#experience .terminal', '.tech-ribbon',
        '.hero-stat'
    ];

    const els = [];
    document.querySelectorAll(selectors.join(',')).forEach(el => {
        if (el.closest('.pipeline-step-enhanced')) return;
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        els.push(el);
    });
    if (!els.length) return;

    // Stagger siblings that share a parent.
    const groups = new Map();
    els.forEach(el => {
        const key = el.parentNode;
        const arr = groups.get(key) || [];
        arr.push(el);
        groups.set(key, arr);
    });
    groups.forEach(arr => {
        arr.forEach((el, i) => {
            if (arr.length > 1) el.style.setProperty('--reveal-delay', (i * 0.09).toFixed(2) + 's');
        });
    });

    if (prefersReducedMotion) {
        els.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

    els.forEach(el => observer.observe(el));
}

// Subtle parallax drift on elements tagged [data-parallax="<speed>"].
function initParallax() {
    if (prefersReducedMotion) return;
    const items = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!items.length) return;

    let ticking = false;
    const update = () => {
        const vh = window.innerHeight;
        items.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.06;
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
            el.style.setProperty('--parallax', offset.toFixed(1) + 'px');
        });
        ticking = false;
    };
    const onScroll = () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
}

// Animated number counters — elements with [data-count] count up once visible.
// Preserves any prefix/suffix via data-prefix / data-suffix.
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const run = (el) => {
        const target = parseFloat(el.getAttribute('data-count')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;

        if (prefersReducedMotion) {
            el.textContent = prefix + target.toFixed(decimals) + suffix;
            return;
        }

        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                run(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}

// Smooth scroll for in-page navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Enhanced Pipeline timeline (desktop progress line + step reveal)
function initPipelineInteractivity() {
    const pipelineSteps = document.querySelectorAll('.pipeline-step-enhanced');
    const pipelineContainer = document.querySelector('.pipeline-container');
    if (!pipelineContainer || !pipelineSteps.length) return;

    const isMobile = window.innerWidth <= 768;

    let progressLine;
    if (!isMobile) {
        progressLine = document.createElement('div');
        progressLine.className = 'pipeline-timeline-progress';
        pipelineContainer.appendChild(progressLine);
    }

    // Staggered reveal of each step
    pipelineSteps.forEach((step, index) => {
        if (prefersReducedMotion) {
            step.classList.add('reveal-step');
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('reveal-step'), index * 160);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
        observer.observe(step);
    });

    if (isMobile) return;

    function updateTimelineProgress() {
        const containerRect = pipelineContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        let scrollProgress = 0;
        if (containerTop < viewportHeight && containerTop + containerHeight > 0) {
            const visibleTop = Math.max(0, viewportHeight - containerTop);
            const scrollableHeight = containerHeight + viewportHeight;
            scrollProgress = Math.min(1, Math.max(0, visibleTop / scrollableHeight));
        } else if (containerTop + containerHeight <= 0) {
            scrollProgress = 1;
        }

        const step4 = pipelineSteps[3];
        if (step4) {
            const step4Rect = step4.getBoundingClientRect();
            const step4Center = (step4Rect.top - containerRect.top) + 24;
            const maxScrollProgress = step4Center / containerHeight;
            scrollProgress = Math.min(scrollProgress, maxScrollProgress);
        }

        const pointerTop = scrollProgress * containerHeight;
        pipelineContainer.style.setProperty('--pointer-top', `${pointerTop}px`);
        pipelineContainer.style.setProperty('--line-height', `${Math.max(0, pointerTop)}px`);

        pipelineSteps.forEach((step) => {
            const stepRect = step.getBoundingClientRect();
            const stepCenter = stepRect.top + stepRect.height / 2;
            step.classList.toggle('active-step',
                stepCenter >= viewportHeight * 0.3 && stepCenter <= viewportHeight * 0.7);
        });
    }

    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
        scrollTimeout = requestAnimationFrame(updateTimelineProgress);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateTimelineProgress);
    updateTimelineProgress();
}

// Form Submission Handler
function initFormSubmission() {
    const form = document.getElementById('enterpriseForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const projectScope = document.getElementById('projectScope').value;
        const timeline = document.getElementById('timeline').value;
        const requirements = document.getElementById('requirements').value;

        if (!name || !phone || !email || !projectScope) {
            showMessage('Please fill in all required fields (Name, Phone, Email, Project Scope)', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, projectScope, timeline, requirements })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showMessage(data.message || 'Inquiry sent. We will get back to you shortly.', 'success');
                form.reset();
            } else {
                showMessage(data.message || 'Failed to submit form. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Inquiry';
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'mb-4 p-3 rounded-xl text-sm border ' + (
            type === 'success'
                ? 'form-message-success'
                : 'form-message-error'
        );
        formMessage.classList.remove('hidden');

        if (type === 'success') {
            setTimeout(() => formMessage.classList.add('hidden'), 5000);
        }
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initDropdowns();
    initScrollReveal();
    initParallax();
    initCounters();
    initSmoothScroll();
    initPipelineInteractivity();
    initFormSubmission();
});
