# 📘 Template Setup Guide

Complete step-by-step guide to setting up your Modern Portfolio Template.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup Wizard](#setup-wizard)
- [Manual Configuration](#manual-configuration)
- [Adding Your Content](#adding-your-content)
- [Building Your Site](#building-your-site)
- [Previewing Locally](#previewing-locally)
- [Next Steps](#next-steps)

---

## ✅ Prerequisites

Before you begin, make sure you have:

- **Node.js** installed (v14 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- **Git** installed
  - Check: `git --version`
  - Download: https://git-scm.com/

- **GitHub account** (for deployment)
  - Sign up: https://github.com/

- **Text editor** (VS Code recommended)
  - Download: https://code.visualstudio.com/

---

## 📦 Installation

### Option 1: Use GitHub Template (Recommended)

1. Go to the template repository on GitHub
2. Click **"Use this template"** button
3. Name your repository: `yourusername.github.io`
4. Clone your new repository:

```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
npm install
```

### Option 2: Clone Directly

```bash
# Clone the template
git clone https://github.com/tian102/modern-portfolio-template.git my-portfolio
cd my-portfolio

# Install dependencies
npm install

# Remove old git history
rm -rf .git

# Initialize new git repository
git init
git add .
git commit -m "Initial commit"

# Add your GitHub remote
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

---

## 🧙‍♂️ Setup Wizard

The easiest way to configure your portfolio is using the interactive setup wizard.

### Run the Wizard

```bash
npm run setup
```

### What the Wizard Will Ask

#### 1. Personal Information

```
Your full name: John Doe
Your professional title: Software Engineer
Your email: john.doe@example.com
Your location (optional): San Francisco, CA
```

**Tips:**
- Use your real name (it appears everywhere)
- Title should be concise (shows in hero section)
- Use a professional email
- Location is optional

#### 2. Social Links

```
GitHub username: johndoe
LinkedIn profile URL: https://linkedin.com/in/johndoe
Twitter/X username (optional): 
```

**Tips:**
- GitHub username only (not full URL)
- LinkedIn can be username or full URL
- Social links appear in footer and contact sections

#### 3. Site Settings

```
Your site URL: https://johndoe.github.io
GitHub repository: https://github.com/johndoe/johndoe.github.io
```

**Tips:**
- Use your actual GitHub Pages URL
- Repository URL is used for "View Source" links

#### 4. Features

```
Enable blog section? (Y/n): Y
Enable projects section? (Y/n): Y
Enable resume/CV download? (Y/n): Y
Resume filename: John-Doe-Resume.pdf
```

**Tips:**
- Disable blog if you only want projects
- Disable projects if you only want blog
- Resume filename should match file in `assets/`

#### 5. Theme (Optional)

```
Primary color (hex) [#2c3e50]: 
Accent color (hex) [#3498db]: 
```

**Tips:**
- Press Enter to use defaults
- Use hex colors: #RRGGBB
- Preview colors at: https://colorpicker.me/

### After the Wizard

The wizard will:
- ✅ Create `config/template.config.js`
- ✅ Update `data/site-content.json`
- ✅ Update HTML meta tags
- ✅ Show next steps

---

## 🔧 Manual Configuration

If you prefer manual configuration or need to update later:

### Edit config/template.config.js

```javascript
module.exports = {
    // Site Metadata
    site: {
        title: 'John Doe - Portfolio',
        description: 'Software Engineer Portfolio',
        url: 'https://johndoe.github.io',
        author: 'John Doe',
        repository: 'https://github.com/johndoe/johndoe.github.io'
    },
    
    // Personal Information
    personal: {
        name: 'John Doe',
        title: 'Software Engineer',
        email: 'john.doe@example.com',
        location: 'San Francisco, CA',
        timezone: 'America/Los_Angeles'
    },
    
    // Social Links
    social: {
        github: 'johndoe',           // Username only
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: '@johndoe',         // Optional
        medium: '',                  // Optional
        devto: ''                    // Optional
    },
    
    // Theme Customization
    theme: {
        primaryColor: '#2c3e50',     // Dark blue-gray
        accentColor: '#3498db',      // Bright blue
        fontFamily: 'Inter, sans-serif',
        codeFontFamily: 'JetBrains Mono, monospace'
    },
    
    // Feature Toggles
    features: {
        blog: true,                  // Show blog section
        projects: true,              // Show projects section
        contactForm: true,           // Show contact form
        sectionNavigation: true,     // Show section nav arrows
        darkModeToggle: false        // Future feature
    },
    
    // Content Settings
    content: {
        projectsPerPage: 6,
        blogPostsPerPage: 10,
        showReadingTime: true,
        showTableOfContents: true
    },
    
    // Resume/CV
    resume: {
        enabled: true,
        filename: 'John-Doe-Resume.pdf'
    }
};
```

### Re-run Setup (Config Only)

To update configuration without answering all questions:

```bash
npm run setup:config
```

---

## 📝 Adding Your Content

### 1. Replace Images

```bash
# Replace with your photo (400x400px recommended)
cp your-photo.png assets/profile.png

# Replace favicon (32x32px recommended)
cp your-favicon.png assets/favicon.png

# Add your resume
cp your-resume.pdf assets/John-Doe-Resume.pdf
```

**Image Tips:**
- Profile: Square, professional photo, 400x400px
- Favicon: Simple icon or initials, 32x32px
- Resume: PDF format, under 5MB

### 2. Clean Example Content (Optional)

```bash
npm run clean
```

**This removes:**
- ❌ Example blog posts (3 posts)
- ❌ Example projects (3 projects)
- ❌ 3D home office viewer
- ❌ Example images

**⚠️ Warning:** This is permanent! Make sure you have backups.

### 3. Create Your First Blog Post

```bash
# Create directory
mkdir -p content/blog/posts/my-first-post

# Create the post
cat > content/blog/posts/my-first-post/index.md << 'EOF'
---
title: My First Blog Post
date: 2025-01-15
tags: [web-development, javascript]
author: John Doe
coverImage: assets/cover.jpg
---

# My First Blog Post

Welcome to my blog! This is my first post.

## Why I Started This Blog

I wanted a place to share my thoughts on...

## What You Can Expect

- Technical tutorials
- Project showcases
- Career insights

Stay tuned for more!
EOF

# Add a cover image (optional)
mkdir -p content/blog/posts/my-first-post/assets
cp cover-image.jpg content/blog/posts/my-first-post/assets/cover.jpg
```

### 4. Create Your First Project

```bash
# Create directory
mkdir -p content/projects/posts/my-awesome-project

# Create the project
cat > content/projects/posts/my-awesome-project/index.md << 'EOF'
---
title: My Awesome Project
description: A web app that does amazing things
tags: [react, nodejs, mongodb]
date: 2025-01-10
github: https://github.com/johndoe/awesome-project
demo: https://awesome-project.demo.com
coverImage: assets/screenshot.png
---

# My Awesome Project

## Overview

This project solves the problem of...

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Technology Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Challenges & Solutions

### Challenge 1
Description and how I solved it...

## Screenshots

![Dashboard](assets/dashboard.png)
![Feature View](assets/feature.png)

## Links

- [Live Demo](https://demo.com)
- [GitHub Repo](https://github.com/johndoe/project)
EOF

# Add screenshots
mkdir -p content/projects/posts/my-awesome-project/assets
cp screenshot1.png content/projects/posts/my-awesome-project/assets/screenshot.png
cp screenshot2.png content/projects/posts/my-awesome-project/assets/dashboard.png
```

---

## 🏗️ Building Your Site

### Validate Configuration

```bash
npm run validate
```

**Checks:**
- ✅ Config file exists
- ✅ Required fields are filled
- ✅ No placeholder text remains
- ✅ Email format is valid
- ✅ Site content exists

### Build Everything

```bash
npm run build
```

**This does:**
1. Validates configuration
2. Builds blog posts from markdown
3. Builds projects from markdown
4. Updates site-content.json
5. Generates theme CSS
6. Updates HTML files

**You should see:**
```
✓ Loaded template configuration
✓ Built 1 blog posts
✓ Built 1 projects
✓ Built X dev docs
✓ Updated site-content.json with configuration
✓ Generated css/theme-variables.css
✓ Added theme CSS to X files
```

### Build Parts Separately

```bash
# Build content only
npm run build:content

# Build theme only
npm run build:theme
```

---

## 👁️ Previewing Locally

### Option 1: Live Server (Recommended)

```bash
# Install live-server globally (one-time)
npm install -g live-server

# Run server
live-server --port=8080
```

Opens automatically at: http://localhost:8080

**Features:**
- Auto-refresh on file changes
- Mobile testing (use local IP)
- Easy to use

### Option 2: Python Server

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Visit: http://localhost:8080

### Option 3: VS Code Extension

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🚀 Next Steps

After setup, you should:

### 1. Customize Content

- [ ] Edit `data/site-content.json` for about/hero sections
- [ ] Add more blog posts
- [ ] Add more projects
- [ ] Update contact information

### 2. Customize Styling

- [ ] Adjust colors in `config/template.config.js`
- [ ] Modify fonts if desired
- [ ] Add custom CSS (advanced)

See [Customization Guide](CUSTOMIZATION.md)

### 3. Deploy Your Site

- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Add custom domain (optional)

See [Deployment Guide](DEPLOYMENT.md)

### 4. Maintain Your Portfolio

- [ ] Regular content updates
- [ ] Keep dependencies updated
- [ ] Monitor site performance
- [ ] Backup your content

---

## 💡 Tips & Best Practices

### Content Writing

- ✅ Use clear, descriptive titles
- ✅ Add tags for organization
- ✅ Include cover images
- ✅ Write for your audience
- ✅ Proofread before publishing

### File Organization

```
content/blog/posts/
├── YYYY-MM-DD-short-title/     # Use date prefix for sorting
│   ├── index.md
│   └── assets/
└── descriptive-name/           # Or descriptive names
    ├── index.md
    └── assets/
```

### Image Guidelines

- Use web-optimized formats (JPEG for photos, PNG for graphics)
- Compress images before uploading
- Use descriptive filenames
- Add alt text in markdown: `![Alt text](image.jpg)`

### Regular Maintenance

```bash
# Weekly: Add new content
npm run build
git add .
git commit -m "Add new blog post"
git push

# Monthly: Update dependencies
npm update
npm run build
```

---

## ❓ Common Questions

**Q: Can I use this template for free?**  
A: Yes! It's MIT licensed - use freely.

**Q: Do I need coding knowledge?**  
A: No! Use the setup wizard and write in markdown.

**Q: Can I customize the design?**  
A: Yes! See [Customization Guide](CUSTOMIZATION.md).

**Q: How do I add a new page?**  
A: See [Customization Guide](CUSTOMIZATION.md#adding-pages).

**Q: Where do I get help?**  
A: Check [Troubleshooting Guide](TROUBLESHOOTING.md) or open an issue.

---

## 🎉 You're All Set!

Your portfolio is configured and ready to go. Now:

1. **Add your content** (blog posts, projects)
2. **Build your site** (`npm run build`)
3. **Preview locally** (live-server)
4. **Deploy** (see [Deployment Guide](DEPLOYMENT.md))

---

**Need help?** See [Troubleshooting](TROUBLESHOOTING.md) or [open an issue](https://github.com/yourusername/modern-portfolio-template/issues).

**Ready to deploy?** See [Deployment Guide](DEPLOYMENT.md) →
