// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'mono': ['JetBrains Mono', 'monospace'],
                'sans': ['Inter', 'sans-serif'],
            },
            colors: {
                'matrix-green': '#00ff41',
                'terminal-blue': '#64ffda',
                'code-purple': '#bb86fc',
                'syntax-orange': '#ffab40',
                'error-red': '#cf6679',
                'dark-bg': '#0d1117',
                'dark-surface': '#161b22',
                'dark-border': '#21262d',
                'light-bg': '#f8fafc',
                'light-surface': '#ffffff',
                'light-border': '#e2e8f0',
                'light-text': '#1e293b',
                'light-text-secondary': '#475569'
            },
            animation: {
                'typing': 'typing 3s steps(40, end), blink 1s infinite step-end',
                'matrix': 'matrix 20s linear infinite',
                'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.8s ease-out'
            }
        }
    }
}

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
        if (theme === 'light') {
            themeSwitch.classList.add('light');
            mobileThemeSwitch.classList.add('light');
            lightLabel.classList.add('active');
            darkLabel.classList.remove('active');
            mobileLightLabel.classList.add('active');
            mobileDarkLabel.classList.remove('active');
        } else {
            themeSwitch.classList.remove('light');
            mobileThemeSwitch.classList.remove('light');
            lightLabel.classList.remove('active');
            darkLabel.classList.add('active');
            mobileLightLabel.classList.remove('active');
            mobileDarkLabel.classList.add('active');
        }
    }

    // Apply initial theme to both html and body
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    updateSwitch(currentTheme);

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateSwitch(newTheme);

        // Recreate matrix effect with new theme
        createMatrixEffect();
    }

    // Add event listeners to both switches
    themeSwitch.addEventListener('click', toggleTheme);
    mobileThemeSwitch.addEventListener('click', toggleTheme);
}

// Matrix background effect
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '01THUNDERBOLTS';
    
    // Clear existing matrix characters
    matrixBg.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 20 + 's';
        char.style.animationDuration = (20 + Math.random() * 10) + 's';
        matrixBg.appendChild(char);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Open mobile menu with slide animation
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        // Trigger animation after a small delay to ensure display change is applied
        setTimeout(() => {
            mobileMenu.classList.remove('mobile-menu-hidden');
        }, 10);
    });

    // Close mobile menu with slide animation
    function closeMenu() {
        mobileMenu.classList.add('mobile-menu-hidden');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }

    closeMobileMenu.addEventListener('click', closeMenu);
    mobileMenuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
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

        // Close dropdown when clicking outside
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
        // Toggle projects list
        mobileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileProjectsList.classList.toggle('show');
            mobileDropdownArrow?.classList.toggle('rotate');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDropdownBtn.contains(e.target) && !mobileProjectsList.contains(e.target)) {
                mobileProjectsList.classList.remove('show');
                mobileDropdownArrow?.classList.remove('rotate');
            }
        });

        // Close when clicking on a project link
        const projectLinks = mobileProjectsList.querySelectorAll('a');
        projectLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileProjectsList.classList.remove('show');
                mobileDropdownArrow?.classList.remove('rotate');
            });
        });
    }
}

// Initialize theme toggle and matrix effect
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    createMatrixEffect();
    initMobileMenu();
    initDropdowns();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation restart
setInterval(() => {
    const typingElements = document.querySelectorAll('.typing');
    typingElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
}, 5000);

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[class*="animate-"]').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Enhanced Pipeline Interactivity
function initPipelineInteractivity() {
    const pipelineSteps = document.querySelectorAll('.pipeline-step-enhanced');
    const pipelineContainer = document.querySelector('.pipeline-container');

    if (!pipelineContainer || !pipelineSteps.length) {
        return;
    }

    // Skip timeline functionality on mobile devices
    const isMobile = window.innerWidth <= 768;

    // Create the green progress line element only on desktop
    let progressLine;
    if (!isMobile) {
        progressLine = document.createElement('div');
        progressLine.className = 'pipeline-timeline-progress';
        pipelineContainer.appendChild(progressLine);
    }

    pipelineSteps.forEach((step, index) => {
        // Add click interaction for mobile
        step.addEventListener('click', () => {
            // Remove active class from all steps
            pipelineSteps.forEach(s => s.classList.remove('active-step'));

            // Add active class to clicked step
            step.classList.add('active-step');

            // Optional: Scroll step into view on mobile
            if (window.innerWidth <= 768) {
                step.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });

        // Add sequential reveal animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal-step');
                    }, index * 200); // Stagger the animations
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(step);
    });

    // Timeline scroll progress functionality - ONLY ON DESKTOP
    if (!isMobile) {
        function updateTimelineProgress() {
            const containerRect = pipelineContainer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how much of the container is visible and scrolled
            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;

            // Progress starts when container enters viewport and ends when it leaves
            let scrollProgress = 0;

            if (containerTop < viewportHeight && containerTop + containerHeight > 0) {
                // Container is in viewport
                const visibleTop = Math.max(0, viewportHeight - containerTop);
                const scrollableHeight = containerHeight + viewportHeight;
                scrollProgress = Math.min(1, Math.max(0, visibleTop / scrollableHeight));
            } else if (containerTop + containerHeight <= 0) {
                // Container has scrolled past
                scrollProgress = 1;
            }

            // Get step 4 position to cap the progress
            const step4 = pipelineSteps[3]; // 0-indexed, so step 4 is index 3
            if (step4) {
                const step4Rect = step4.getBoundingClientRect();
                const step4Top = step4Rect.top - containerRect.top;
                const step4Center = step4Top + 24; // Offset to center of circle

                // Calculate the max progress percentage based on step 4 position
                const maxProgressDistance = step4Center;
                const totalDistance = containerHeight;
                const maxScrollProgress = maxProgressDistance / totalDistance;

                // Cap the scroll progress at step 4
                scrollProgress = Math.min(scrollProgress, maxScrollProgress);
            }

            // Calculate pointer position (starts at top, stops at step 4)
            const firstCircleOffset = 0; // start from top aligned with first circle
            const totalDistance = containerHeight;
            const pointerTop = firstCircleOffset + (scrollProgress * totalDistance);

            // Update pointer position
            pipelineContainer.style.setProperty('--pointer-top', `${pointerTop}px`);

            // Update green line height (from top to pointer)
            const lineHeight = Math.max(0, pointerTop);
            pipelineContainer.style.setProperty('--line-height', `${lineHeight}px`);

            // Update active step highlighting
            pipelineSteps.forEach((step) => {
                const stepRect = step.getBoundingClientRect();
                const stepCenter = stepRect.top + stepRect.height / 2;

                // Highlight step when it's in the center portion of viewport
                if (stepCenter >= viewportHeight * 0.3 && stepCenter <= viewportHeight * 0.7) {
                    step.classList.add('active-step');
                } else {
                    step.classList.remove('active-step');
                }
            });
        }

        // Throttled scroll handler for performance
        let scrollTimeout;
        function handleScroll() {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(updateTimelineProgress);
        }

        // Initialize scroll listener only on desktop
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateTimelineProgress);

        // Initial update
        updateTimelineProgress();
    }
}

// Initialize benefit cards scroll-triggered animation
function initBenefitCards() {
    const benefitCards = document.querySelectorAll('.benefit-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation will trigger via CSS animation property
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    benefitCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize enhanced pipeline functionality
document.addEventListener('DOMContentLoaded', () => {
    initPipelineInteractivity();
    initBenefitCards();

    // Add reveal animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .pipeline-step-enhanced {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .pipeline-step-enhanced.reveal-step {
            opacity: 1;
            transform: translateY(0);
        }

        .pipeline-step-enhanced.active-step .terminal-output {
            border-left: 3px solid var(--matrix-green);
            background: rgba(0, 255, 65, 0.1);
            transform: scale(1.02);
        }

        .pipeline-step-enhanced.active-step .step-indicator > div {
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .pipeline-step-enhanced.active-step .terminal-output {
                transform: scale(1.01);
            }
        }
    `;
    document.head.appendChild(style);
});

// Form Submission Handler
function initFormSubmission() {
    const form = document.getElementById('enterpriseForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const projectScope = document.getElementById('projectScope').value;
        const timeline = document.getElementById('timeline').value;
        const requirements = document.getElementById('requirements').value;

        // Validate required fields (Name, Phone, Email, Project Scope are required)
        if (!name || !phone || !email || !projectScope) {
            showMessage('Please fill in all required fields (Name, Phone, Email, Project Scope)', 'error');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Send data to Vercel serverless function
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    projectScope,
                    timeline,
                    requirements
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showMessage(data.message || 'Form submitted successfully! We will get back to you soon.', 'success');
                form.reset(); // Clear the form
            } else {
                showMessage(data.message || 'Failed to submit form. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Inquiry';
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `mb-4 p-3 rounded font-mono text-sm ${
            type === 'success'
                ? 'bg-matrix-green/20 text-matrix-green border border-matrix-green/40'
                : 'bg-error-red/20 text-error-red border border-error-red/40'
        }`;
        formMessage.classList.remove('hidden');

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
    }
}

// Initialize form submission on page load
document.addEventListener('DOMContentLoaded', () => {
    initFormSubmission();
});
