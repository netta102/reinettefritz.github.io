# 📁 Assets Folder

This folder is for your site assets like images, documents, and other media files.

## 📸 Recommended Images

Add these images to customize your portfolio:

### Profile/Hero Section
- `profile.jpg` or `profile.png` - Your profile photo
  - Size: 400x400px (square)
  - Format: JPG or PNG
  - Usage: Hero section, about page

### Resume/CV
- `your-name-resume.pdf` - Your resume or CV
  - Format: PDF
  - Size: Under 5MB
  - Keep filename professional

### Favicon
- `favicon.ico` or `favicon.png` - Site favicon
  - Size: 32x32px or 64x64px
  - Format: ICO or PNG
  - Shows in browser tab

### Open Graph Image (Optional)
- `og-image.jpg` - Social media preview image
  - Size: 1200x630px
  - Format: JPG
  - Used when sharing on social media

## 🗂️ Folder Structure

```
assets/
├── README.md           # This file
├── profile.jpg         # Your profile photo
├── yourname-resume.pdf # Your resume
├── favicon.ico         # Browser icon
├── og-image.jpg        # Social sharing image (optional)
└── docs/               # Any other documents
```

## 📝 Content-Specific Images

For blog posts and projects, keep images with the content:

```
content/
├── blog/posts/your-post/
│   └── assets/              # Blog post images here
│       ├── screenshot1.png
│       └── diagram.svg
└── projects/posts/your-project/
    └── assets/              # Project images here
        ├── thumbnail.jpg    # Required!
        └── demo.gif
```

## 🎨 Image Optimization Tips

Before adding images:

1. **Resize to appropriate dimensions**
   - Don't upload 4000x3000 images for a 400x400 display
   - Use exact or 2x size for retina displays

2. **Compress images**
   - Use [TinyPNG.com](https://tinypng.com) for PNG/JPG
   - Use [SVGOMG](https://jakearchibald.github.io/svgomg/) for SVG
   - Target: Under 500KB per image, ideally under 200KB

3. **Choose the right format**
   - **JPG** - Photos, complex images (smaller file size)
   - **PNG** - Screenshots, UI, transparency needed
   - **SVG** - Logos, icons, diagrams (scalable)
   - **GIF** - Simple animations (or use video instead)

4. **Use descriptive filenames**
   - ✅ `project-dashboard-screenshot.png`
   - ❌ `image1.png` or `IMG_20240115.jpg`

## 🖼️ Adding Images to Your Site

### In HTML Files

```html
<!-- Relative path from HTML file -->
<img src="assets/profile.jpg" alt="Your Name">
```

### In Markdown Files

```markdown
<!-- Relative path from markdown file -->
![Profile Photo](../../assets/profile.jpg)

<!-- Or for images in content folder -->
![Screenshot](assets/screenshot.png)
```

### In CSS

```css
/* Relative path from CSS file */
background-image: url('../assets/hero-background.jpg');
```

## ⚠️ Important Notes

- **Git LFS**: If you have many large images (>10MB total), consider Git LFS
- **Public Files**: Everything in this folder will be publicly accessible
- **Don't commit**: Sensitive documents, private photos, large videos
- **Copyright**: Only use images you have rights to use

## 🎯 Quick Start

1. **Add your profile photo:**
   - Take or choose a professional photo
   - Crop to square (1:1 ratio)
   - Resize to 400x400px
   - Save as `profile.jpg` in this folder

2. **Add your resume:**
   - Export as PDF
   - Name it `yourname-resume.pdf`
   - Place in this folder

3. **Update config:**
   ```javascript
   // config/template.config.js
   personal: {
       image: 'assets/profile.jpg',
       // ...
   },
   resume: {
       file: 'assets/yourname-resume.pdf'
   }
   ```

4. **Build and preview:**
   ```bash
   npm run build
   npx live-server
   ```

---

## 📚 Resources

- [TinyPNG](https://tinypng.com) - Compress PNG/JPG
- [Squoosh](https://squoosh.app) - Advanced image optimization
- [Remove.bg](https://remove.bg) - Remove backgrounds
- [Canva](https://canva.com) - Create graphics
- [Unsplash](https://unsplash.com) - Free stock photos

---

**Need help?** Check the [Customization Guide](../docs/CUSTOMIZATION.md)
