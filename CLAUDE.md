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