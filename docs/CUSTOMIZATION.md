# 🎨 Customization Guide

Advanced guide to customizing your Modern Portfolio Template.

---

## 📋 Table of Contents

- [Configuration](#configuration)
- [Theme Customization](#theme-customization)
- [Content Customization](#content-customization)
- [Layout Customization](#layout-customization)
- [Adding Custom Sections](#adding-custom-sections)
- [Custom Styling](#custom-styling)
- [Custom JavaScript](#custom-javascript)
- [Advanced Features](#advanced-features)

---

## ⚙️ Configuration

### Configuration File Structure

All configuration lives in `config/template.config.js`:

```javascript
module.exports = {
    site: {
        // Site-wide settings
    },
    personal: {
        // Your information
    },
    social: {
        // Social media links
    },
    theme: {
        // Colors and fonts
    },
    features: {
        // Feature toggles
    },
    content: {
        // Content settings
    },
    resume: {
        // Resume configuration
    }
};
```

### Quick Config Updates

```bash
# Re-run setup wizard
npm run setup

# Or edit config manually and rebuild
npm run build
```

---

## 🎨 Theme Customization

### Colors

#### Basic Color Change

```javascript
// config/template.config.js
theme: {
    primaryColor: '#ff6b6b',    // Coral red
    accentColor: '#4ecdc4'      // Turquoise
}
```

```bash
npm run build  # Regenerates theme CSS
```

#### Color Palette Examples

**Professional Blue:**
```javascript
theme: {
    primaryColor: '#2c3e50',  // Dark slate
    accentColor: '#3498db'    // Bright blue
}
```

**Modern Purple:**
```javascript
theme: {
    primaryColor: '#663399',  // Rebecca purple
    accentColor: '#9d4edd'    // Medium purple
}
```

**Warm Orange:**
```javascript
theme: {
    primaryColor: '#c44536',  // Rusty red
    accentColor: '#ff6f3c'    // Bright orange
}
```

**Cool Green:**
```javascript
theme: {
    primaryColor: '#1e3a8a',  // Deep blue
    accentColor: '#10b981'    // Emerald green
}
```

### Fonts

#### Change Font Family

```javascript
theme: {
    fontFamily: 'Poppins, sans-serif',
    codeFontFamily: 'Fira Code, monospace'
}
```

#### Using Google Fonts

1. Find fonts at https://fonts.google.com
2. Add to HTML `<head>`:

```html
<!-- index.html, about.html, etc. -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Fira+Code&display=swap" rel="stylesheet">
```

3. Update config:

```javascript
theme: {
    fontFamily: 'Poppins, sans-serif',
    codeFontFamily: 'Fira Code, monospace'
}
```

4. Rebuild:

```bash
npm run build:theme
```

#### Font Combinations

**Modern & Clean:**
```javascript
fontFamily: 'Inter, sans-serif'
codeFontFamily: 'JetBrains Mono, monospace'
```

**Elegant & Professional:**
```javascript
fontFamily: 'Playfair Display, serif'
codeFontFamily: 'Source Code Pro, monospace'
```

**Friendly & Approachable:**
```javascript
fontFamily: 'Poppins, sans-serif'
codeFontFamily: 'Fira Code, monospace'
```

### Advanced Theme Customization

Edit `css/theme-variables.css` directly (regenerated on build):

```css
:root {
    /* Override specific variables */
    --theme-primary: #your-color;
    --theme-accent: #your-accent;
    
    /* Add custom variables */
    --theme-success: #10b981;
    --theme-warning: #f59e0b;
    --theme-error: #ef4444;
}
```

---

## 📝 Content Customization

### Site Content File

Edit `data/site-content.json` for non-markdown content:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your tagline"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "typedRoles": [
      "Software Engineer",
      "Full-Stack Developer",
      "Problem Solver"
    ],
    "description": [
      "First paragraph...",
      "Second paragraph..."
    ]
  },
  "about": {
    "sections": [
      {
        "title": "Who I Am",
        "content": ["Paragraph 1", "Paragraph 2"]
      }
    ]
  }
}
```

### Typed Roles Animation

The hero section animates through multiple roles:

```json
"typedRoles": [
    "Software Engineer",
    "Full-Stack Developer",
    "Problem Solver",
    "Tech Enthusiast",
    "Your Custom Role"
]
```

### About Section

Structure your about section:

```json
"about": {
    "pageTitle": "About Me",
    "pageTagline": "Your tagline",
    "sections": [
        {
            "title": "Section Title",
            "content": ["Paragraph 1", "Paragraph 2"]
        },
        {
            "title": "Another Section",
            "intro": "Optional intro",
            "list": [
                "List item 1",
                "List item 2"
            ]
        }
    ]
}
```

---

## 🏗️ Layout Customization

### Page Layout

Each page follows this structure:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Meta, CSS, Fonts -->
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">...</nav>
    
    <!-- Main Content -->
    <section class="section-name">
        <div class="container">
            <!-- Your content -->
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">...</footer>
</body>
</html>
```

### Modifying Sections

#### Hide a Section

```javascript
// Method 1: Feature toggle
features: {
    blog: false  // Hides blog section
}
```

```css
/* Method 2: CSS */
#blog {
    display: none;
}
```

#### Reorder Sections

Edit the HTML file (e.g., `index.html`):

```html
<!-- Move projects before blog -->
<section id="projects">...</section>
<section id="blog">...</section>
```

#### Change Section Numbers

```json
// data/site-content.json
"sections": {
    "about": { "number": "01." },
    "projects": { "number": "02." },
    "blog": { "number": "03." }
}
```

---

## ➕ Adding Custom Sections

### Step 1: Add HTML

```html
<!-- index.html -->
<section id="custom-section" class="custom-section">
    <div class="container">
        <div class="section-header">
            <span class="section-number">05.</span>
            <h2 class="section-title">Custom Section</h2>
            <div class="section-line"></div>
        </div>
        <div class="custom-content">
            <!-- Your content -->
        </div>
    </div>
</section>
```

### Step 2: Add Styles

```css
/* css/style.css */
.custom-section {
    padding: var(--section-padding);
    background: var(--bg-secondary);
}

.custom-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
}
```

### Step 3: Add JavaScript (if needed)

```javascript
// js/custom-section.js
document.addEventListener('DOMContentLoaded', function() {
    // Your custom functionality
    const customSection = document.querySelector('.custom-section');
    // ...
});
```

### Step 4: Add to Navigation

```json
// data/site-content.json
"navigation": [
    {"label": "About", "url": "#about"},
    {"label": "Projects", "url": "#projects"},
    {"label": "Custom", "url": "#custom-section"}
]
```

---

## 🎨 Custom Styling

### Override Existing Styles

Create `css/custom.css`:

```css
/* Custom modifications */

/* Change button style */
.btn-primary {
    border-radius: 25px;
    padding: 12px 32px;
    font-weight: 600;
}

/* Modify card shadows */
.project-card {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Custom animations */
@keyframes customFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.custom-fade {
    animation: customFade 0.6s ease-out;
}
```

Link in HTML:

```html
<link rel="stylesheet" href="css/custom.css">
```

### CSS Variables Reference

```css
/* Common variables you can override */
:root {
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
    --shadow-lg: 0 8px 16px rgba(0,0,0,0.1);
    
    /* Transitions */
    --transition-fast: 0.15s;
    --transition-normal: 0.3s;
    --transition-slow: 0.5s;
}
```

---

## ⚡ Custom JavaScript

### Add Custom Functionality

Create `js/custom.js`:

```javascript
// Custom JavaScript functionality

// Example: Add smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Navigation height
        
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// Example: Add reading progress bar
window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// Example: Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
```

Link in HTML:

```html
<script src="js/custom.js"></script>
```

### Modify Existing Scripts

Edit existing scripts carefully:

```javascript
// js/index.js - Add to existing functionality

// Add this to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Your additions
    initCustomFeature();
});

function initCustomFeature() {
    // Your custom feature
}
```

---

## 🚀 Advanced Features

### Dark Mode Toggle

```javascript
// js/dark-mode.js
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check saved preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
});
```

```css
/* css/dark-mode.css */
body.dark-mode {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
}
```

### Analytics Integration

```html
<!-- Add to <head> of all pages -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Contact Form Integration

Using Formspree:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="_replyto" placeholder="Your email">
    <textarea name="message" placeholder="Your message"></textarea>
    <button type="submit">Send</button>
</form>
```

### SEO Optimization

```html
<!-- Add to <head> -->
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords, here">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yoursite.com/assets/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">
<meta name="twitter:card" content="summary_large_image">
```

---

## 💡 Tips & Best Practices

### Performance

- ✅ Optimize images (use tinypng.com)
- ✅ Minimize custom CSS/JS
- ✅ Use lazy loading for images
- ✅ Enable browser caching

### Accessibility

- ✅ Use semantic HTML
- ✅ Add alt text to images
- ✅ Ensure color contrast
- ✅ Test with keyboard navigation

### Maintainability

- ✅ Comment your custom code
- ✅ Keep customizations in separate files
- ✅ Document your changes
- ✅ Test before deploying

### Version Control

```bash
# Create a branch for major changes
git checkout -b custom-feature

# Make changes, test, commit
git add .
git commit -m "Add custom feature"

# Merge when ready
git checkout main
git merge custom-feature
```

---

## 📚 Example Customizations

### Example 1: Custom Hero Background

```css
/* css/custom.css */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('assets/pattern.svg');
    opacity: 0.1;
}
```

### Example 2: Animated Skill Bars

```html
<div class="skill">
    <div class="skill-name">JavaScript</div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="90"></div>
    </div>
</div>
```

```css
.skill-bar {
    background: #e0e0e0;
    height: 8px;
    border-radius: 4px;
}

.skill-progress {
    background: var(--theme-accent);
    height: 100%;
    border-radius: 4px;
    transition: width 1s ease;
}
```

```javascript
// Animate on scroll
const skills = document.querySelectorAll('.skill-progress');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.dataset.progress;
            entry.target.style.width = progress + '%';
        }
    });
});
skills.forEach(skill => observer.observe(skill));
```

### Example 3: Project Filtering

```html
<div class="filter-buttons">
    <button data-filter="all">All</button>
    <button data-filter="web">Web</button>
    <button data-filter="mobile">Mobile</button>
</div>

<div class="projects-grid">
    <div class="project-card" data-category="web">...</div>
    <div class="project-card" data-category="mobile">...</div>
</div>
```

```javascript
const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});
```

---

## ❓ Need Help?

- 📖 Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- 💬 [Open a discussion](https://github.com/yourusername/modern-portfolio-template/discussions)
- 🐛 [Report an issue](https://github.com/yourusername/modern-portfolio-template/issues)

---

**Ready to deploy?** See [Deployment Guide](DEPLOYMENT.md) →
