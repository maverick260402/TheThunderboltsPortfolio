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

// Initialize theme toggle and matrix effect
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    createMatrixEffect();
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
}

// Initialize enhanced pipeline functionality
document.addEventListener('DOMContentLoaded', () => {
    initPipelineInteractivity();
    
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
