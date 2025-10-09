# Claude Instructions for Thunderbolts Portfolio

## Project Overview
This is a structured portfolio website for "The Thunderbolts" - an AI & ML engineering showcase with a dark matrix theme. The project is organized with separate HTML, CSS, and JavaScript files for better maintainability and scalability.

## Project Structure
```
Portfolio/
├── index.html                  # Main HTML file
├── assets/                     # Asset directory
│   ├── css/
│   │   └── styles.css         # All CSS styles and theme system
│   ├── js/
│   │   └── script.js          # All JavaScript functionality
│   └── images/                # Future image assets (if needed)
├── README.md                  # Project documentation
└── CLAUDE.md                 # This file
```

## Key Information
- **Main File**: `index.html` - Clean HTML structure with external asset links
- **Styles**: `assets/css/styles.css` - Complete theme system and responsive design
- **Scripts**: `assets/js/script.js` - Interactive functionality and animations
- **Dependencies**: Uses external CDNs only (Tailwind CSS, Google Fonts)
- **Theme**: Dark matrix/terminal aesthetic with green accents
- **Technology**: Pure HTML5, CSS3, Vanilla JavaScript with Tailwind CSS

## External Dependencies
- Tailwind CSS: `https://cdn.tailwindcss.com`
- Google Fonts: JetBrains Mono & Inter fonts

## Development Guidelines
1. **Organized Architecture**: Separate concerns with dedicated files for HTML, CSS, and JS
2. **No Build Process**: No compilation, bundling, or build steps required
3. **Modular Structure**: Easy to maintain and extend with new pages/features
4. **Testing**: Open `index.html` directly in browser or use simple HTTP server

## Key Components
- **Tech Stack Ribbon** - Scrolling banner in Capabilities section with 21 technologies (lines ~440-700+)
- **Matrix Background** - Animated falling characters effect
- **Terminal Windows** - CLI-styled containers with dark theme
- **Glitch Text Effects** - Cyberpunk-style animations
- **Interactive Hover States** - Matrix-green color transitions
- **Business Process Pipeline** - Interactive 4-step process visualizer designed for non-technical audiences (lines ~563-750+)

## Common Tasks
- **Content Updates**: Modify HTML sections in `index.html`
- **Tech Stack Updates**: Edit ribbon items in the tech-scroll section in `index.html`
- **Styling Changes**: Update CSS in `assets/css/styles.css`
- **Animation Tweaks**: Adjust keyframes in CSS file or JavaScript functionality in `assets/js/script.js`
- **Color Scheme**: Modify CSS custom color properties in `styles.css`
- **Ribbon Speed**: Change animation-duration in .tech-scroll CSS rule in `styles.css`
- **Process Section Updates**: Modify business messaging and steps in the "How We Work Together" section
- **Business Benefits**: Update ROI-focused stats and trust elements in process section
- **New Features**: Add HTML structure, style in CSS file, add interactivity in JS file

## Process Section Technical Details
- **CSS Classes**: `.pipeline-step-enhanced`, `.terminal-output`, `.step-indicator`, `.pipeline-connector`
- **Interactive Features**: Hover effects, click interactions, sequential reveal animations
- **Mobile Responsive**: Stacked layout, touch-friendly interactions, optimized typography
- **Business Elements**: Benefit boxes, ROI stats, trust indicators, clear CTAs
- **Animation System**: Gentle pulse effects, smooth transitions, scroll-triggered reveals

## Testing Commands
```bash
# Simple HTTP server (if needed)
python -m http.server 8000

# Or just open directly
open index.html
```

## Recent Changes
- Moved tech stack ribbon from top navigation to "Our Capabilities" section
- Expanded tech stack to 21 technologies including web fundamentals, cloud platforms, ML/AI frameworks
- Added comprehensive technology coverage: HTML, CSS, JavaScript, Kubernetes, Flask, FastAPI, Google Cloud Platform, PyTorch, OpenCV, Scikit-Learn, Hugging Face, Transformers
- Implemented smooth horizontal scrolling animation (30s duration)
- Added hover effects with matrix-green color transitions
- Included SVG icons for each technology
- Maintains seamless infinite scroll with duplicated tech items

### Latest Update: Business-Friendly Process Section
- **Complete redesign** of process pipeline for non-technical audiences
- **Business-focused language** replacing technical jargon with clear benefits
- **Visual enhancements** with emoji icons, benefit boxes, and interactive elements
- **4-step process**: "Let's Talk" → "Blueprint Creation" → "Building Your Solution" → "Go Live & Grow"
- **Trust-building elements** including ROI focus, partnership approach, and peace-of-mind guarantees
- **Mobile-optimized** responsive design with stacked layout for smaller screens
- **Enhanced animations** with gentle pulse effects and hover interactions
- **Call-to-action section** with consultation and portfolio buttons

## Important Notes
- This is NOT a Next.js or React project
- No package.json, build scripts, or node_modules needed
- Organized file structure makes it easy to add new pages and features
- Maintain the matrix/terminal theme when making changes
- Tech ribbon uses duplicated items for seamless infinite scroll
- All animations are CSS-based for optimal performance
- Easy to extend - just add new HTML files and link to existing CSS/JS assets

---

## Dark Mode & Light Mode System Documentation

### **Architecture Overview**
- **Default Theme**: Light Mode (Changed from Dark Mode)
- **Storage**: `localStorage.getItem('theme')` - persists user preference across sessions
- **Implementation**: CSS Custom Properties + JavaScript toggle + inline script for flash prevention + data-theme attribute
- **Flash Prevention**: Inline script in `<head>` sets theme before page renders

---

### **1. CSS Implementation** ([assets/css/styles.css](assets/css/styles.css))

#### **CSS Variables System** (Lines 1-24)
```css
:root {
    /* Dark Mode Variables */
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --border-color: #21262d;
    --text-primary: #ffffff;
    --text-secondary: #d0d7de;
    --text-muted: #7d8590;
    --matrix-bg: #0d1117;
    --surface-bg: #161b22;
    --scrollbar-track: #0d1117;
}

[data-theme="light"] {
    /* Light Mode Variables */
    --bg-primary: #f8fafc;
    --bg-secondary: #f1f5f9;
    --border-color: #d1d5db;
    --text-primary: #111827;
    --text-secondary: #374151;
    --text-muted: #6b7280;
    --matrix-bg: #f8fafc;
    --surface-bg: #ffffff;
    --scrollbar-track: #e5e7eb;
}
```

**Key Point**: `:root` contains **dark mode** variables. Light mode is activated via `[data-theme="light"]` selector. The inline script sets `data-theme="light"` by default to make light mode the default.

#### **Smooth Transitions** (Lines 26-29)
```css
* {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

#### **Light Mode Overrides** (Lines 32-223)
- Navigation styling (lines 38-43)
- Text color adjustments (lines 46-107)
- Terminal styling (lines 108-113)
- Tech ribbon styling (lines 116-140)
- Form inputs (lines 176-190)
- Matrix background opacity (lines 151-158)
- Glitch effects (lines 211-222)

#### **Theme Toggle Switch Styling** (Lines 225-342)
- **Desktop Switch**: `.theme-switch` with CLI-style arrows (`•••>` / `<•••`)
- **Mobile Switch**: `.mobile-theme-switch` with smaller arrows (`••>` / `<••`)
- **Active State**: `.theme-switch-label.active` highlights current mode

---

### **2. JavaScript Implementation** ([assets/js/script.js](assets/js/script.js))

#### **Theme Toggle Function** (Lines 36-88)
```javascript
function initThemeToggle() {
    const themeSwitch = document.getElementById('themeSwitch');
    const mobileThemeSwitch = document.getElementById('mobileThemeSwitch');
    const lightLabel = document.getElementById('lightLabel');
    const darkLabel = document.getElementById('darkLabel');
    const mobileLightLabel = document.getElementById('mobileLightLabel');
    const mobileDarkLabel = document.getElementById('mobileDarkLabel');

    // Check for saved theme or default to light (Line 45)
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Function to update switch position and labels (Lines 47-64)
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

    // Apply initial theme to both html and body (Lines 66-69)
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    updateSwitch(currentTheme);

    // Function to toggle theme (Lines 71-83)
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateSwitch(newTheme);

        // Recreate matrix effect with new theme (Line 81)
        createMatrixEffect();
    }

    // Add event listeners to both switches (Lines 85-87)
    themeSwitch.addEventListener('click', toggleTheme);
    mobileThemeSwitch.addEventListener('click', toggleTheme);
}
```

**CRITICAL**: Theme is read/written to `document.documentElement` (the `<html>` tag), NOT `document.body`. This matches the inline script behavior.

#### **Initialization** (Lines 109-112)
```javascript
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    createMatrixEffect();
});
```

---

### **3. HTML Structure** ([index.html](index.html), project pages)

#### **Inline Script in Head** (Lines 7-14 - CRITICAL FOR FLASH PREVENTION)
```html
<script>
    // Prevent flash of dark theme - set theme immediately before page renders
    (function() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.body?.setAttribute('data-theme', theme);
    })();
</script>
```

**Purpose**: This script runs BEFORE CSS loads, preventing the flash of dark theme on page load. It must be in `<head>` before any `<link>` tags.

#### **Body Element** (Line 19)
```html
<body class="font-sans overflow-x-hidden"
      style="background-color: var(--bg-primary); color: var(--text-primary);">
```

#### **Desktop Theme Toggle** (Lines 38-44 in index.html)
```html
<div class="theme-switch-container">
    <span id="lightLabel" class="theme-switch-label active">Light Mode</span>
    <div class="theme-switch" id="themeSwitch">
        <span class="theme-switch-pointer"></span>
    </div>
    <span id="darkLabel" class="theme-switch-label">Dark Mode</span>
</div>
```

**Note**: `lightLabel` has `active` class by default (not `darkLabel`).

#### **Mobile Theme Toggle** (Lines 26-34 in index.html)
```html
<div class="mobile-theme-switch-container">
    <span id="mobileLightLabel" class="theme-switch-label active">Light</span>
    <div class="mobile-theme-switch" id="mobileThemeSwitch">
        <span class="mobile-theme-switch-pointer"></span>
    </div>
    <span id="mobileDarkLabel" class="theme-switch-label">Dark</span>
</div>
```

**Note**: `mobileLightLabel` has `active` class by default (not `mobileDarkLabel`).

---

### **4. Critical Rules - DO NOT BREAK**

✅ **Always Preserve**:
1. **Default theme = `'light'`** (Line 45 in script.js AND line 10 in all HTML files' inline scripts)
2. **`:root` contains dark mode variables** (Lines 2-12 in styles.css) - DO NOT SWAP
3. **`[data-theme="light"]` contains light mode variables** (Lines 14-24 in styles.css) - DO NOT SWAP
4. **`localStorage.getItem('theme') || 'light'`** - fallback must be 'light' (changed from 'dark')
5. **`document.documentElement.setAttribute('data-theme', currentTheme)`** - theme is set on `<html>` element, NOT body
6. **Both desktop and mobile switches must be synchronized** via same toggle function
7. **Inline script in `<head>` MUST run before CSS loads** - prevents flash
8. **Inline script and JavaScript toggle MUST both use `document.documentElement`** - ensures sync

❌ **Never Do**:
1. Swap `:root` and `[data-theme="light"]` selectors in CSS
2. Change default from 'light' to 'dark' in JavaScript or inline scripts
3. Remove or move the inline script from `<head>`
4. Use `document.body` for theme - MUST use `document.documentElement`
5. Modify `updateSwitch()` logic without updating both desktop and mobile
6. Remove `localStorage` persistence
7. Change inline script default without also changing script.js default

---

### **5. How Theme Switching Works**

1. **Page Load (Before Render)**:
   - **Inline script in `<head>` runs first** (before CSS loads)
   - Checks `localStorage.getItem('theme')`
   - Defaults to `'light'` if no saved preference
   - Sets `document.documentElement.setAttribute('data-theme', theme)`
   - Sets `document.body?.setAttribute('data-theme', theme)` (optional chaining for safety)
   - **This prevents flash** by setting theme before CSS applies

2. **Page Load (After DOMContentLoaded)**:
   - JavaScript `initThemeToggle()` runs
   - Re-checks localStorage and confirms theme on `document.documentElement`
   - Updates switch UI with `updateSwitch()`
   - This ensures switch position matches actual theme

3. **User Clicks Toggle**:
   - `toggleTheme()` reads current theme from `document.documentElement.getAttribute('data-theme')`
   - Switches to opposite theme
   - Sets theme on both `document.documentElement` AND `document.body`
   - Saves to localStorage
   - Updates switch UI
   - Recreates matrix effect for new theme

4. **CSS Application**:
   - All components use CSS variables (e.g., `var(--bg-primary)`)
   - When `data-theme="light"`, light mode variables override `:root` dark mode defaults
   - Smooth transitions animate the change (0.3s ease)

---

### **6. Flash Prevention Technical Details**

**The Problem**:
- CSS loads with `:root` dark mode variables by default
- JavaScript runs after HTML/CSS loads
- This creates a brief flash of dark theme before JavaScript sets light mode

**The Solution**:
- Inline `<script>` in `<head>` runs synchronously BEFORE CSS
- Sets `data-theme="light"` immediately
- CSS respects `[data-theme="light"]` selector from first paint
- No flash occurs

**Why document.documentElement?**:
- The `<html>` tag is the root element
- Inline script can safely set attributes on it before `<body>` exists
- JavaScript toggle must use the same element for consistency
- Both inline script and toggle use `document.documentElement` - perfect sync

---

### **Theme System Files Reference**
- **[assets/css/styles.css](assets/css/styles.css)**: Lines 1-342 (theme variables & overrides)
- **[assets/js/script.js](assets/js/script.js)**: Lines 36-88, 109-112 (toggle logic)
- **[index.html](index.html)**: Lines 7-14 (inline script), 19 (body), 28-32 (mobile toggle), 39-43 (desktop toggle)
- **[project-sales-agent.html](project-sales-agent.html)**: Lines 7-14 (inline script), 28-32 (mobile toggle), 40-44 (desktop toggle)
- **[project-saas-platform.html](project-saas-platform.html)**: Lines 7-14 (inline script), 28-32 (mobile toggle), 40-44 (desktop toggle)
- **[project-content-creation.html](project-content-creation.html)**: Lines 7-14 (inline script), 28-32 (mobile toggle), 40-44 (desktop toggle)

---

### **Summary of Changes from Previous Documentation**

**What Changed**:
1. ✅ Default theme changed from 'dark' to 'light'
2. ✅ Added inline script in `<head>` to prevent flash
3. ✅ Theme now set on `document.documentElement` instead of `document.body`
4. ✅ Light mode labels now have `active` class by default
5. ✅ Both inline script and JavaScript toggle use `document.documentElement` for sync

**What Stayed the Same**:
1. ✅ CSS structure unchanged - `:root` still has dark mode, `[data-theme="light"]` still has light mode
2. ✅ localStorage persistence unchanged
3. ✅ Switch UI and toggle logic unchanged
4. ✅ CSS variables and transitions unchanged

**⚠️ This system is working correctly - DO NOT MODIFY unless explicitly requested by user.**