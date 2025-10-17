# 🔧 Troubleshooting Guide

Common issues and solutions for the Modern Portfolio Template.

---

## 📋 Table of Contents

- [Configuration Issues](#configuration-issues)
- [Build Errors](#build-errors)
- [Content Not Showing](#content-not-showing)
- [Styling Issues](#styling-issues)
- [Deployment Problems](#deployment-problems)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Advanced Debugging](#advanced-debugging)

---

## ⚙️ Configuration Issues

### Error: "Config file not found"

**Problem:**
```bash
Error: Cannot find module './config/template.config.js'
```

**Solutions:**

1. **Verify file exists:**
```bash
dir config\template.config.js  # Windows
ls config/template.config.js   # Mac/Linux
```

2. **Run setup if missing:**
```bash
npm run setup
```

3. **Check file permissions:**
```bash
icacls config\template.config.js  # Windows
ls -l config/template.config.js   # Mac/Linux
```

### Error: "Invalid configuration"

**Problem:**
```bash
✗ Configuration validation failed
✗ Invalid theme color format
```

**Solutions:**

1. **Check color format:**
```javascript
// ❌ Invalid
primaryColor: 'blue'
primaryColor: 'rgb(255, 0, 0)'

// ✅ Valid
primaryColor: '#3498db'
primaryColor: '#36f'
```

2. **Validate configuration:**
```bash
npm run validate
```

3. **Reset to defaults:**
```bash
# Backup current config
copy config\template.config.js config\template.config.backup.js

# Run setup wizard
npm run setup
```

### Error: "Placeholder values detected"

**Problem:**
```bash
✗ Placeholder values found: name, email, github
```

**Solution:**

```javascript
// config/template.config.js
personal: {
    // ❌ Don't use placeholders
    name: 'Your Name',
    
    // ✅ Use your actual info
    name: 'Jane Doe'
}
```

Then rebuild:
```bash
npm run build
```

---

## 🔨 Build Errors

### Error: "npm command not found"

**Problem:**
```bash
'npm' is not recognized as an internal or external command
```

**Solutions:**

1. **Install Node.js:**
   - Download from https://nodejs.org
   - Choose LTS version
   - Restart terminal after installation

2. **Verify installation:**
```bash
node --version
npm --version
```

3. **Add to PATH (Windows):**
   - Search "Environment Variables"
   - Add `C:\Program Files\nodejs\` to PATH

### Error: "Module not found"

**Problem:**
```bash
Error: Cannot find module 'fs'
Error: Cannot find module 'marked'
```

**Solutions:**

1. **Install dependencies:**
```bash
npm install
```

2. **Clear cache and reinstall:**
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

3. **Check Node version:**
```bash
node --version  # Should be 14+ 
```

### Error: "EACCES permission denied"

**Problem:**
```bash
EACCES: permission denied, mkdir 'C:\...'
```

**Solutions:**

1. **Run as administrator (Windows):**
   - Right-click PowerShell
   - "Run as administrator"

2. **Fix npm permissions (Mac/Linux):**
```bash
sudo chown -R $USER ~/.npm
```

3. **Use different directory:**
```bash
cd ~/Documents
git clone ...
```

### Build Script Fails

**Problem:**
```bash
npm run build
> build-content.js failed
```

**Solutions:**

1. **Run scripts individually:**
```bash
npm run validate        # Should pass
npm run build:content   # Check output
npm run build:theme     # Check output
```

2. **Check for syntax errors:**
```bash
node -c scripts/build-content.js
node -c config/template.config.js
```

3. **Verify content structure:**
```bash
dir content\blog\posts\*\index.md
dir content\projects\posts\*\index.md
```

---

## 📝 Content Not Showing

### Blog Posts Not Appearing

**Problem:** Blog page is empty

**Solutions:**

1. **Check blog is enabled:**
```javascript
// config/template.config.js
features: {
    blog: true  // Must be true
}
```

2. **Verify post structure:**
```bash
content/blog/posts/your-post/
├── index.md       # Required
└── assets/        # Optional
```

3. **Check frontmatter:**
```markdown
---
title: "Your Post Title"
date: "2024-01-15"
tags: ["tag1", "tag2"]
featured: true
---

Your content here...
```

4. **Rebuild content:**
```bash
npm run build:content
```

5. **Check JSON output:**
```bash
cat data\blog-posts.json
```

### Projects Not Displaying

**Problem:** Projects section is empty

**Solutions:**

1. **Enable projects feature:**
```javascript
features: {
    projects: true
}
```

2. **Check project structure:**
```bash
content/projects/posts/your-project/
├── index.md
├── assets/
│   └── thumbnail.jpg  # Required
```

3. **Verify frontmatter:**
```markdown
---
title: "Project Name"
description: "Short description"
technologies: ["React", "Node.js"]
github: "https://github.com/..."
demo: "https://demo.com"
thumbnail: "assets/thumbnail.jpg"
featured: true
---
```

4. **Rebuild and check:**
```bash
npm run build:content
cat data\projects.json
```

### Images Not Loading

**Problem:** Images show broken icon

**Solutions:**

1. **Check file paths:**
```markdown
<!-- ❌ Wrong -->
![Alt](C:\Users\...\image.jpg)
![Alt](/assets/image.jpg)

<!-- ✅ Correct -->
![Alt](assets/image.jpg)
![Alt](./assets/image.jpg)
```

2. **Verify file exists:**
```bash
dir content\blog\posts\your-post\assets\image.jpg
```

3. **Check file extensions:**
   - Use `.jpg`, `.png`, `.gif`, `.svg`
   - Lowercase extensions recommended

4. **Check file size:**
   - Keep under 1MB
   - Optimize at tinypng.com

---

## 🎨 Styling Issues

### Theme Not Applied

**Problem:** Site uses default colors, not configured theme

**Solutions:**

1. **Generate theme CSS:**
```bash
npm run build:theme
```

2. **Verify theme file:**
```bash
cat css\theme-variables.css
```

Should contain:
```css
:root {
    --theme-primary: #yourcolor;
    --theme-accent: #yourcolor;
}
```

3. **Check HTML includes theme:**
```html
<link rel="stylesheet" href="css/theme-variables.css">
```

4. **Clear browser cache:**
   - Chrome/Edge: Ctrl+Shift+Delete
   - Or hard refresh: Ctrl+Shift+R

### CSS Not Loading

**Problem:** Site has no styling

**Solutions:**

1. **Check browser console:**
   - F12 → Console tab
   - Look for 404 errors

2. **Verify CSS paths:**
```html
<!-- Check in HTML files -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/theme-variables.css">
```

3. **Check file exists:**
```bash
dir css\style.css
dir css\theme-variables.css
```

4. **Check for typos:**
```html
<!-- ❌ Wrong -->
<link rel="stylesheet" href="css/style.CSS">
<link rel="stylesheet" href="css/styles.css">

<!-- ✅ Correct -->
<link rel="stylesheet" href="css/style.css">
```

### Layout Broken on Mobile

**Problem:** Site looks broken on phone

**Solutions:**

1. **Add viewport meta tag:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. **Test responsive design:**
   - F12 → Device toolbar (Ctrl+Shift+M)
   - Test different screen sizes

3. **Check CSS media queries:**
```css
/* Should exist in style.css */
@media (max-width: 768px) {
    /* Mobile styles */
}
```

4. **Avoid fixed widths:**
```css
/* ❌ Avoid */
.container { width: 1200px; }

/* ✅ Better */
.container { max-width: 1200px; width: 100%; }
```

---

## 🚀 Deployment Problems

### GitHub Pages 404 Error

**Problem:** `yourname.github.io/repo` shows 404

**Solutions:**

1. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: main branch
   - Save

2. **Check repository name:**
   - For `username.github.io`: must match username exactly
   - For project page: any name works

3. **Wait for deployment:**
```bash
# Check deployment status
gh run list --workflow=pages-build-deployment
```

4. **Force rebuild:**
```bash
git commit --allow-empty -m "Trigger Pages rebuild"
git push
```

### Changes Not Showing After Deploy

**Problem:** Deployed site shows old content

**Solutions:**

1. **Hard refresh browser:**
   - Chrome/Edge: Ctrl+Shift+R
   - Firefox: Ctrl+F5

2. **Clear browser cache completely**

3. **Check deployment status:**
   - GitHub: Actions tab
   - Netlify: Deploys tab
   - Vercel: Deployments

4. **Verify commit pushed:**
```bash
git log --oneline -5
git push  # Push if needed
```

5. **Bust cache with version:**
```html
<link rel="stylesheet" href="css/style.css?v=2">
<script src="js/main.js?v=2"></script>
```

### Custom Domain Not Working

**Problem:** Custom domain shows error

**Solutions:**

1. **Wait 24-48 hours** for DNS propagation

2. **Check DNS records:**
```bash
nslookup yourdomain.com
```

Should show GitHub IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

3. **Verify CNAME file:**
```bash
cat CNAME  # Should contain: yourdomain.com
```

4. **Check GitHub Pages settings:**
   - Custom domain field filled
   - DNS check passed ✓

5. **Test DNS propagation:**
   - https://www.whatsmydns.net
   - Enter your domain

### SSL Certificate Error

**Problem:** "Not Secure" warning

**Solutions:**

1. **Wait for certificate:**
   - Takes up to 24 hours
   - Check: Settings → Pages → HTTPS status

2. **Enable Enforce HTTPS:**
   - Settings → Pages
   - Check "Enforce HTTPS"

3. **Clear browser SSL cache:**
```bash
# Chrome
chrome://net-internals/#hsts
# Delete domain security policies
```

---

## ⚡ Performance Issues

### Slow Page Load

**Problem:** Site takes long to load

**Solutions:**

1. **Optimize images:**
```bash
# Use TinyPNG or ImageOptim
# Keep images under 500KB
```

2. **Minimize JavaScript:**
   - Remove unused scripts
   - Load scripts at end of `<body>`

3. **Enable caching:**
```apache
# .htaccess
<FilesMatch "\.(jpg|jpeg|png|gif|css|js)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

4. **Use CDN for libraries:**
```html
<!-- Instead of local files -->
<script src="https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"></script>
```

5. **Test performance:**
   - https://pagespeed.web.dev
   - https://gtmetrix.com

### High Memory Usage

**Problem:** Browser tab uses lots of RAM

**Solutions:**

1. **Limit animated elements:**
   - Remove unused animations
   - Use CSS animations instead of JavaScript

2. **Optimize 3D viewer:**
   - Reduce polygon count
   - Use smaller textures
   - Dispose of objects when done

3. **Lazy load images:**
```html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy">
```

---

## 🌐 Browser Compatibility

### Site Broken in Internet Explorer

**Problem:** IE shows errors

**Solution:** IE is not supported. Recommend users upgrade to:
- Microsoft Edge
- Chrome
- Firefox
- Safari

Add notice:
```html
<!--[if IE]>
<div class="ie-warning">
    Please upgrade to a modern browser for the best experience.
</div>
<![endif]-->
```

### Features Not Working in Safari

**Problem:** Some JavaScript features fail

**Solutions:**

1. **Check browser console** (Safari → Develop → Show Error Console)

2. **Add polyfills if needed:**
```html
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

3. **Test in multiple browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

---

## 🔍 Advanced Debugging

### Debug Mode

Add to any page:

```javascript
// Enable debug mode
const DEBUG = true;

if (DEBUG) {
    console.log('Config:', config);
    console.log('Content:', content);
    console.log('Features:', features);
}
```

### Check Build Output

```bash
# Validate configuration
npm run validate

# Check what's generated
cat data\site-content.json
cat data\blog-posts.json
cat data\projects.json
cat css\theme-variables.css
```

### Browser DevTools

1. **Open DevTools:** F12
2. **Console tab:** See errors
3. **Network tab:** Check loaded files
4. **Elements tab:** Inspect HTML/CSS
5. **Application tab:** Check localStorage

### Common Console Errors

**"Failed to load resource"**
```
❌ Failed to load resource: net::ERR_FILE_NOT_FOUND
   http://localhost:8080/css/style.css

✓ Check file exists
✓ Check file path spelling
✓ Check file extension
```

**"Unexpected token"**
```
❌ Uncaught SyntaxError: Unexpected token

✓ Check JavaScript syntax
✓ Look for missing brackets/quotes
✓ Validate JSON files
```

**"Cannot read property of undefined"**
```
❌ Cannot read property 'name' of undefined

✓ Check data is loaded
✓ Add null checks: config?.personal?.name
✓ Console.log() to debug
```

### Git Issues

**Merge Conflicts:**
```bash
# See conflicts
git status

# Edit conflicted files
# Remove <<<<<<, ======, >>>>>> markers

# Mark as resolved
git add .
git commit
```

**Uncommitted Changes:**
```bash
# Stash changes
git stash

# Do other work
git pull

# Restore changes
git stash pop
```

**Wrong Commit:**
```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 📞 Getting Help

### Before Asking for Help

1. ✅ Check this guide
2. ✅ Search existing issues
3. ✅ Test in different browser
4. ✅ Try clean install

### Gather Information

Include in bug reports:

```
**Environment:**
- OS: Windows 11 / macOS / Linux
- Node version: 18.16.0
- Browser: Chrome 120

**Issue:**
Clear description of problem

**Steps to Reproduce:**
1. Run npm install
2. Run npm run build
3. Open index.html
4. See error

**Expected:** What should happen
**Actual:** What actually happens

**Screenshots:**
Attach if relevant

**Console Errors:**
Paste any error messages
```

### Get Support

- 📖 [Documentation](../README.md)
- 💬 [Discussions](https://github.com/yourusername/modern-portfolio-template/discussions)
- 🐛 [Report Bug](https://github.com/yourusername/modern-portfolio-template/issues/new)
- ✉️ Email: your-email@example.com

---

## ✅ Quick Fixes Checklist

Start here:

- [ ] Run `npm install`
- [ ] Run `npm run validate`
- [ ] Run `npm run build`
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check browser console for errors (F12)
- [ ] Test in different browser
- [ ] Restart development server
- [ ] Check file paths are correct
- [ ] Verify files exist in correct locations

---

## 🔄 Clean Reinstall

If all else fails:

```bash
# 1. Backup your content
Copy-Item -Recurse content content.backup
Copy-Item config\template.config.js config.backup

# 2. Clean everything
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 3. Reinstall
npm install

# 4. Restore config
Copy-Item config.backup config\template.config.js

# 5. Rebuild
npm run build

# 6. Test
npx live-server
```

---

**Still stuck?** [Open an issue](https://github.com/yourusername/modern-portfolio-template/issues) with:
- Detailed description
- Steps to reproduce
- Error messages
- Screenshots
- Environment info

We're here to help! 🙌
