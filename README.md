# 🎨 Modern Portfolio Template

> A beautiful, customizable portfolio website template with markdown-based content management. No coding required!

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ✨ Features

- 📝 **Markdown-Based Content** - Write blog posts and projects in simple markdown
- 🎨 **Easy Customization** - Change colors, fonts, and content via configuration file
- 🚀 **One-Command Setup** - Interactive wizard guides you through setup
- 📱 **Fully Responsive** - Looks great on desktop, tablet, and mobile
- 🌐 **GitHub Pages Ready** - Deploy for free in minutes
- ⚡ **Fast & Lightweight** - Pure HTML/CSS/JS, no frameworks
- 🎯 **Feature Toggles** - Enable/disable sections without touching code
- 🔧 **No Build Tools Required** - Simple Node.js scripts, no webpack/bundler

---

## 🚀 Quick Start

Get your portfolio up and running in 3 steps:

### 1. Clone & Install

```bash
# Use this template (click "Use this template" button on GitHub)
# OR clone directly:
git clone https://github.com/yourusername/modern-portfolio-template.git my-portfolio
cd my-portfolio
npm install
```

### 2. Setup & Configure

```bash
npm run setup
```

Answer a few questions about yourself, and the wizard will configure everything automatically!

### 3. Build & Deploy

```bash
npm run build
```

That's it! Your portfolio is ready. See [Deployment Guide](docs/DEPLOYMENT.md) to publish it.

---

## 📖 Documentation

- 📘 [**Setup Guide**](docs/TEMPLATE_SETUP.md) - Detailed setup instructions
- 🎨 [**Customization Guide**](docs/CUSTOMIZATION.md) - Advanced customization
- 🚀 [**Deployment Guide**](docs/DEPLOYMENT.md) - How to deploy your site
- 🔧 [**Troubleshooting**](docs/TROUBLESHOOTING.md) - Common issues & solutions
- 🤝 [**Contributing**](docs/CONTRIBUTING.md) - How to contribute

---

## 🎯 What You Get

### Sections
- ✅ **Hero Section** - Eye-catching introduction with your photo
- ✅ **About** - Tell your story and showcase skills
- ✅ **Projects** - Portfolio of your work with images and links
- ✅ **Blog** - Share your thoughts and knowledge
- ✅ **Contact** - Multiple ways for people to reach you

### Features
- 📧 **Contact Form** - Direct email integration
- 🏷️ **Tags & Categories** - Organize your content
- 📊 **Reading Time** - Auto-calculated for blog posts
- 🔗 **Social Links** - GitHub, LinkedIn, Twitter, etc.
- 📄 **Resume Download** - Link to your CV/resume
- 🧭 **Smooth Navigation** - Section scrolling and navigation

---

## ⚙️ Configuration

All customization happens in one file: `config/template.config.js`

```javascript
module.exports = {
    // Personal Information
    personal: {
        name: 'Your Name',
        title: 'Software Engineer',
        email: 'your.email@example.com'
    },
    
    // Theme Colors
    theme: {
        primaryColor: '#2c3e50',
        accentColor: '#3498db'
    },
    
    // Feature Toggles
    features: {
        blog: true,
        projects: true,
        contactForm: true
    }
};
```

**Or use the wizard:**
```bash
npm run setup
```

See the [Customization Guide](docs/CUSTOMIZATION.md) for all options.

---

## 📝 Adding Content

### Create a Blog Post

```bash
# 1. Create directory
mkdir -p content/blog/posts/my-first-post

# 2. Create index.md
cat > content/blog/posts/my-first-post/index.md << EOF
---
title: My First Blog Post
date: 2025-01-15
tags: [web, development]
author: Your Name
---

# My First Blog Post

Your content here...
EOF

# 3. Build
npm run build
```

### Create a Project

```bash
# 1. Create directory
mkdir -p content/projects/posts/my-project

# 2. Create index.md
cat > content/projects/posts/my-project/index.md << EOF
---
title: My Awesome Project
description: A brief description
tags: [javascript, react]
github: https://github.com/yourusername/project
demo: https://project-demo.com
---

# My Awesome Project

Project details here...
EOF

# 3. Add images to: content/projects/posts/my-project/assets/

# 4. Build
npm run build
```

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | Interactive setup wizard |
| `npm run build` | Build your site |
| `npm run clean` | Remove example content |
| `npm run validate` | Validate your configuration |
| `npm run deploy` | Build and deploy (git push) |

---

## 📁 Project Structure

```
my-portfolio/
├── config/
│   └── template.config.js      # Your configuration
├── content/
│   ├── blog/posts/             # Your blog posts
│   └── projects/posts/         # Your projects
├── assets/
│   ├── profile.png             # Your photo
│   ├── favicon.png             # Your favicon
│   └── Your-Resume.pdf         # Your resume
├── data/
│   └── site-content.json       # Generated site data
├── css/                        # Stylesheets
├── js/                         # JavaScript
├── scripts/                    # Build scripts
└── *.html                      # Site pages
```

---

## 🎨 Customization Examples

### Change Colors

```javascript
// config/template.config.js
theme: {
    primaryColor: '#ff6b6b',  // Coral red
    accentColor: '#4ecdc4'    // Turquoise
}
```

```bash
npm run build  # Colors update automatically!
```

### Hide Blog Section

```javascript
// config/template.config.js
features: {
    blog: false,      // Blog section hidden
    projects: true
}
```

```bash
npm run build  # Blog section disappears!
```

### Update Personal Info

```bash
npm run setup  # Re-run wizard
# OR edit config/template.config.js manually
npm run build
```

---

## 🌐 Deployment

### GitHub Pages (Recommended & Free)

1. Push to GitHub
2. Go to Settings → Pages
3. Source: `main` branch
4. Done! Site live at `https://yourusername.github.io`

See [Deployment Guide](docs/DEPLOYMENT.md) for:
- Custom domains
- Netlify deployment
- Vercel deployment
- Traditional hosting

---

## 💡 Tips

1. **Start Simple** - Use the setup wizard, add content later
2. **Use Templates** - Copy `content/blog/template/` for new posts
3. **Preview Locally** - Install live-server: `npm install -g live-server && live-server`
4. **Commit Often** - Use git to track changes
5. **Read Docs** - Check docs/ folder for detailed guides

---

## 🐛 Troubleshooting

**Build fails?**
```bash
npm run validate  # Check configuration
npm install       # Reinstall dependencies
```

**Content not showing?**
```bash
npm run build     # Rebuild
# Check data/*.json files were generated
```

**Styling broken?**
```bash
# Clear browser cache (Ctrl+Shift+R)
# Check css/theme-variables.css exists
npm run build:theme
```

See [Troubleshooting Guide](docs/TROUBLESHOOTING.md) for more help.

---

## 📸 Screenshots

<!-- Add screenshots here -->
_Coming soon - see [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for examples_

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](docs/CONTRIBUTING.md).

Found a bug? [Open an issue](https://github.com/yourusername/modern-portfolio-template/issues)

---

## 📄 License

MIT License - Use freely for your portfolio!

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for developers
- Inspired by the need for simple, customizable portfolios
- Thanks to all contributors!

---

## 📞 Support

- 📖 [Documentation](docs/)
- 💬 [Discussions](https://github.com/yourusername/modern-portfolio-template/discussions)
- 🐛 [Issues](https://github.com/yourusername/modern-portfolio-template/issues)

---

**Ready to build your portfolio?** [Get Started →](#-quick-start)
