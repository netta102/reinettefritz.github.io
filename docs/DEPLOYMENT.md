# 🚀 Deployment Guide

Complete guide to deploying your Modern Portfolio Template.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [GitHub Pages (Recommended)](#github-pages-recommended)
- [Custom Domain](#custom-domain)
- [Other Hosting Platforms](#other-hosting-platforms)
- [CI/CD Automation](#cicd-automation)
- [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Configuration is complete (`config/template.config.js`)
- [ ] Example content is removed (`npm run clean`)
- [ ] All content is added (blog posts, projects)
- [ ] Build completes successfully (`npm run build`)
- [ ] Site previews correctly locally
- [ ] All images are optimized
- [ ] Links are tested
- [ ] Contact form is configured (if enabled)
- [ ] Analytics are set up (optional)

### Validate Configuration

```bash
npm run validate
```

Expected output:
```
✓ Configuration is valid
✓ All required fields are filled
✓ No placeholder values detected
```

### Build for Production

```bash
npm run build
```

This runs:
1. `validate-config.js` - Ensures config is valid
2. `build-content.js` - Compiles markdown to JSON
3. `apply-theme.js` - Generates theme CSS

### Test Locally

```bash
npx live-server
```

Visit `http://localhost:8080` and test:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Projects/blog posts display
- ✅ Contact form submits
- ✅ Links open correctly
- ✅ Responsive on mobile

---

## 🌐 GitHub Pages (Recommended)

### Method 1: GitHub Website

1. **Push Your Code**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select `main` branch
   - Click **Save**

3. **Wait for Deployment**
   - GitHub will build and deploy (1-2 minutes)
   - Site will be live at: `https://yourusername.github.io/repo-name`

4. **Update Configuration**

```javascript
// config/template.config.js
site: {
    url: 'https://yourusername.github.io/repo-name'
}
```

```bash
npm run build
git add .
git commit -m "Update site URL"
git push
```

### Method 2: GitHub CLI

```bash
# Install GitHub CLI (if not installed)
# Windows (using winget)
winget install GitHub.cli

# Enable Pages
gh repo edit --enable-pages --pages-branch main

# Check status
gh repo view --web
```

### Method 3: Personal Site (username.github.io)

If your repo is named `yourusername.github.io`:

1. **Automatic Deployment**
   - GitHub Pages is automatically enabled
   - Site is live at: `https://yourusername.github.io`
   - No configuration needed!

2. **Update Config**

```javascript
site: {
    url: 'https://yourusername.github.io'
}
```

### Troubleshooting GitHub Pages

**Issue: 404 Error**

```bash
# Ensure gh-pages branch exists or main is selected
git branch -a

# Check Pages settings
gh repo view --web  # Go to Settings → Pages
```

**Issue: Changes Not Showing**

```bash
# Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
# Or clear browser cache

# Check deployment status
gh run list --workflow=pages-build-deployment
```

**Issue: CSS/JS Not Loading**

```javascript
// Use relative paths in config
site: {
    baseUrl: '/repo-name'  // If not using custom domain
}
```

---

## 🌍 Custom Domain

### Step 1: Get a Domain

Purchase from:
- [Namecheap](https://www.namecheap.com) (affordable)
- [Google Domains](https://domains.google) (easy)
- [Cloudflare](https://www.cloudflare.com) (includes CDN)

### Step 2: Configure DNS

Add these DNS records:

**For Apex Domain (example.com):**

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

**For Subdomain (www.example.com):**

```
Type    Name    Value
CNAME   www     yourusername.github.io
```

### Step 3: Configure GitHub Pages

1. Go to repository Settings → Pages
2. Under **Custom domain**, enter: `yourdomain.com`
3. Wait for DNS check (may take 24-48 hours)
4. Enable **Enforce HTTPS** once available

### Step 4: Add CNAME File

Create `CNAME` file in root directory:

```bash
echo "yourdomain.com" > CNAME
```

```bash
git add CNAME
git commit -m "Add custom domain"
git push
```

### Step 5: Update Configuration

```javascript
// config/template.config.js
site: {
    url: 'https://yourdomain.com',
    title: 'Your Name - Portfolio'
}
```

```bash
npm run build
git add .
git commit -m "Update to custom domain"
git push
```

### Verify HTTPS

```bash
# Should redirect to HTTPS
curl -I http://yourdomain.com
```

---

## 🚀 Other Hosting Platforms

### Netlify

**Pros:** Free, continuous deployment, instant previews
**Best for:** Automatic deployments on git push

1. **Sign Up**: https://netlify.com
2. **New Site from Git**:
   - Connect GitHub
   - Select repository
   - Build settings:
     ```
     Build command: npm run build
     Publish directory: ./
     ```
3. **Deploy!**

**Custom Domain on Netlify:**
- Domain settings → Add custom domain
- Update DNS to Netlify nameservers
- Automatic HTTPS

**netlify.toml Configuration:**

```toml
[build]
  command = "npm run build"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

**Pros:** Fast, preview deployments, analytics
**Best for:** Performance-critical sites

1. **Sign Up**: https://vercel.com
2. **Import Project**:
   - Import from GitHub
   - Select repository
   - Auto-detects settings
3. **Deploy!**

**vercel.json Configuration:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "./",
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

### Cloudflare Pages

**Pros:** Free, fast CDN, DDoS protection
**Best for:** High-traffic sites

1. **Sign Up**: https://pages.cloudflare.com
2. **Create Project**:
   - Connect GitHub
   - Build settings:
     ```
     Build command: npm run build
     Build output: ./
     ```
3. **Deploy!**

### Traditional Hosting (cPanel, FTP)

**For shared hosting:**

1. **Build Locally**:

```bash
npm run build
```

2. **Upload Files via FTP**:
   - Use FileZilla or similar
   - Upload all files to `public_html/`

3. **Configure .htaccess**:

```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|svg|css|js)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### Firebase Hosting

**Pros:** Google infrastructure, free SSL
**Best for:** Integration with Firebase services

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting
# Choose public directory: ./
# Configure as single-page app: No

# Deploy
firebase deploy
```

**firebase.json:**

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

---

## 🤖 CI/CD Automation

### GitHub Actions (Auto-deploy on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Netlify Auto-Deploy

Already automatic! Every push to `main` triggers deployment.

**Preview Deployments:**
- Every pull request gets a preview URL
- Test before merging to `main`

### Vercel Auto-Deploy

Automatic on push. Configure in `vercel.json`:

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preview": true
    }
  }
}
```

---

## 📊 Post-Deployment

### Verify Deployment

```bash
# Check if site is live
curl -I https://yoursite.com

# Check SSL certificate
curl -vI https://yoursite.com 2>&1 | grep -i "SSL"
```

### Add Analytics

**Google Analytics:**

```html
<!-- Add to <head> of all pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible (Privacy-friendly):**

```html
<script defer data-domain="yoursite.com" src="https://plausible.io/js/script.js"></script>
```

### Set Up Monitoring

**Uptime Monitoring:**
- [UptimeRobot](https://uptimerobot.com) (free, 50 monitors)
- [Pingdom](https://www.pingdom.com)

**Performance Monitoring:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### SEO Optimization

**Submit to Search Engines:**

```bash
# Google Search Console
https://search.google.com/search-console

# Bing Webmaster Tools
https://www.bing.com/webmasters
```

**Create sitemap.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yoursite.com/projects.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yoursite.com/blog.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

**robots.txt:**

```txt
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

### Performance Optimization

**Enable Compression:**

```apache
# .htaccess (for Apache)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>
```

**Image Optimization:**

```bash
# Install imagemin
npm install -g imagemin-cli imagemin-pngquant imagemin-mozjpeg

# Optimize images
imagemin assets/images/*.{jpg,png} --out-dir=assets/images/optimized --plugin=pngquant --plugin=mozjpeg
```

**CDN for Assets:**

Use Cloudflare or jsDelivr for static assets:

```html
<!-- Use CDN for libraries -->
<script src="https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"></script>
```

---

## 🔄 Update Workflow

### Regular Updates

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push

# Automatic deployment triggers
```

### Content Updates Only

```bash
# Add new blog post
vim content/blog/posts/my-new-post/index.md

# Rebuild and deploy
npm run build
git add .
git commit -m "Add new blog post"
git push
```

### Rollback if Needed

```bash
# View recent commits
git log --oneline

# Rollback to previous version
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force  # Use with caution!
```

---

## 📋 Deployment Checklist

- [ ] Configuration validated
- [ ] Content built successfully
- [ ] Local preview tested
- [ ] Changes committed to git
- [ ] Pushed to GitHub
- [ ] Deployment successful
- [ ] Live site tested
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Analytics added
- [ ] Search engines notified
- [ ] Performance tested

---

## ❓ Common Issues

### Site Not Updating

```bash
# Clear GitHub Pages cache
# Add query parameter: ?v=123

# Or update with empty commit
git commit --allow-empty -m "Trigger rebuild"
git push
```

### 404 on Subpages

**Solution:** Use hash routing or configure server redirects

```javascript
// Use hash navigation
<a href="#/about">About</a>

// Instead of
<a href="about.html">About</a>
```

### CSS Not Loading

```html
<!-- Use absolute paths -->
<link rel="stylesheet" href="/css/style.css">

<!-- Or relative with base tag -->
<base href="/">
<link rel="stylesheet" href="css/style.css">
```

---

## 🎯 Next Steps

- ✅ Set up monitoring
- ✅ Configure analytics
- ✅ Submit to search engines
- ✅ Share your portfolio!

---

## 📚 Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

**Need help with customization?** See [Customization Guide](CUSTOMIZATION.md) →

**Having issues?** Check [Troubleshooting Guide](TROUBLESHOOTING.md) →
