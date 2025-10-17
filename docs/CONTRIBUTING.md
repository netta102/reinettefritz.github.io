# 🤝 Contributing to Modern Portfolio Template

Thank you for considering contributing to the Modern Portfolio Template! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ❌ Use inappropriate language or imagery
- ❌ Make personal attacks or harassment
- ❌ Share others' private information

### Enforcement

Violations can be reported to [your-email@example.com]. All complaints will be reviewed and investigated promptly and fairly.

---

## 🎯 How Can I Contribute?

### Reporting Bugs

**Before submitting a bug report:**

1. ✅ Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. ✅ Search [existing issues](https://github.com/yourusername/modern-portfolio-template/issues)
3. ✅ Try to reproduce on latest version
4. ✅ Collect relevant information

**Good bug report includes:**

```markdown
**Describe the bug**
Clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Node: [e.g. 18.16.0]
- Browser: [e.g. Chrome 120]

**Additional context**
Any other context about the problem.
```

[Create bug report →](https://github.com/yourusername/modern-portfolio-template/issues/new?template=bug_report.md)

### Suggesting Features

**Before suggesting a feature:**

1. ✅ Check [existing discussions](https://github.com/yourusername/modern-portfolio-template/discussions)
2. ✅ Ensure it aligns with project goals
3. ✅ Consider if it benefits most users

**Good feature request includes:**

```markdown
**Feature Description**
Clear description of the feature.

**Problem it Solves**
What problem does this solve?

**Proposed Solution**
How would you implement it?

**Alternatives Considered**
Other solutions you've thought about.

**Additional Context**
Mockups, examples, etc.
```

[Suggest feature →](https://github.com/yourusername/modern-portfolio-template/issues/new?template=feature_request.md)

### Improving Documentation

Documentation improvements are always welcome!

- Fix typos or unclear explanations
- Add examples or screenshots
- Improve setup instructions
- Translate to other languages

### Code Contributions

See [Pull Request Process](#pull-request-process) below.

---

## 💻 Development Setup

### Prerequisites

- Node.js 14+ and npm
- Git
- Text editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**

   Click "Fork" on GitHub

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/modern-portfolio-template.git
cd modern-portfolio-template
```

3. **Add upstream remote**

```bash
git remote add upstream https://github.com/yourusername/modern-portfolio-template.git
```

4. **Install dependencies**

```bash
npm install
```

5. **Create a branch**

```bash
git checkout -b feature/your-feature-name
```

6. **Make changes and test**

```bash
npm run build
npx live-server
```

### Development Workflow

```bash
# Keep your fork updated
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes, commit often
git add .
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open pull request on GitHub
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Test your changes thoroughly
2. ✅ Update documentation if needed
3. ✅ Follow coding standards
4. ✅ Write clear commit messages
5. ✅ Ensure all builds pass

### Submitting PR

1. **Push to your fork:**

```bash
git push origin feature/your-feature
```

2. **Open PR on GitHub:**
   - Go to original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out template

3. **PR Template:**

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests if applicable
- [ ] Tests pass locally

## Screenshots (if applicable)
Add screenshots to demonstrate changes.
```

### Review Process

1. Maintainer reviews your PR
2. Address any requested changes
3. Once approved, PR is merged
4. Your contribution is live! 🎉

### After PR is Merged

```bash
# Update your local main
git checkout main
git pull upstream main

# Delete feature branch
git branch -d feature/your-feature
git push origin --delete feature/your-feature
```

---

## 📏 Coding Standards

### JavaScript

**Style:**

```javascript
// ✅ Use const/let, not var
const config = require('./config');
let count = 0;

// ✅ Use single quotes for strings
const name = 'value';

// ✅ Use template literals
const message = `Hello, ${name}!`;

// ✅ Use arrow functions
const map = items.map(item => item.id);

// ✅ Use async/await
async function fetchData() {
    const data = await fetch(url);
    return data.json();
}

// ✅ Add comments for complex logic
// Calculate viewport offset for scroll animation
const offset = window.innerHeight * 0.8;
```

**Naming:**

```javascript
// ✅ camelCase for variables/functions
const userName = 'John';
function getData() {}

// ✅ PascalCase for classes
class UserProfile {}

// ✅ UPPERCASE for constants
const API_URL = 'https://api.example.com';

// ✅ Descriptive names
// ❌ Bad
function fn(x) {}
const d = new Date();

// ✅ Good
function formatDate(date) {}
const currentDate = new Date();
```

**Error Handling:**

```javascript
// ✅ Handle errors gracefully
try {
    const data = JSON.parse(content);
    return data;
} catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
}

// ✅ Validate inputs
function setColor(color) {
    if (!color || typeof color !== 'string') {
        throw new Error('Invalid color value');
    }
    // ...
}
```

### CSS

**Organization:**

```css
/* ✅ Group related styles */
/* Navigation */
.navbar { }
.nav-link { }

/* Buttons */
.btn { }
.btn-primary { }

/* ✅ Use CSS custom properties */
:root {
    --color-primary: #3498db;
    --spacing: 1rem;
}

/* ✅ Mobile-first approach */
.container {
    width: 100%;
}

@media (min-width: 768px) {
    .container {
        max-width: 1200px;
    }
}
```

**Naming:**

```css
/* ✅ Use kebab-case */
.nav-link { }
.btn-primary { }

/* ✅ BEM methodology */
.card { }
.card__title { }
.card__body { }
.card--featured { }

/* ❌ Avoid deep nesting */
.nav .item .link .icon { }  /* Too specific */

/* ✅ Keep it simple */
.nav-icon { }
```

### HTML

```html
<!-- ✅ Semantic HTML -->
<header>
    <nav>...</nav>
</header>
<main>
    <section>...</section>
</main>
<footer>...</footer>

<!-- ✅ Accessibility -->
<img src="..." alt="Descriptive text">
<button aria-label="Close menu">×</button>

<!-- ✅ Proper indentation -->
<div class="container">
    <div class="row">
        <div class="col">
            Content
        </div>
    </div>
</div>
```

### Markdown

```markdown
<!-- ✅ Clear headings -->
# Main Title
## Section
### Subsection

<!-- ✅ Use lists -->
- Item 1
- Item 2

<!-- ✅ Code blocks with language -->
```javascript
const example = 'code';
```

<!-- ✅ Links with descriptive text -->
[See documentation](link) instead of [Click here](link)
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# ✅ Good commits
git commit -m "feat(wizard): add color picker for theme configuration"
git commit -m "fix(build): resolve path issues on Windows"
git commit -m "docs(setup): add troubleshooting section"

# ❌ Bad commits
git commit -m "fixed stuff"
git commit -m "WIP"
git commit -m "asdf"
```

### Detailed Example

```
feat(theme): add dark mode support

- Add dark mode toggle button
- Create dark mode CSS variables
- Save preference to localStorage
- Update documentation

Closes #123
```

---

## 🧪 Testing

### Manual Testing

Before submitting PR:

1. **Test setup flow:**
```bash
npm run setup
# Answer questions, verify config generated
```

2. **Test build:**
```bash
npm run build
# Verify no errors
```

3. **Test content:**
```bash
# Add sample blog post/project
npm run build:content
# Verify JSON generated correctly
```

4. **Test in browser:**
```bash
npx live-server
# Test all pages, features, responsive design
```

5. **Test across browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

### Testing Checklist

- [ ] Setup wizard works
- [ ] Config validation works
- [ ] Build completes successfully
- [ ] Content compiles correctly
- [ ] Theme applies properly
- [ ] All pages load
- [ ] Navigation works
- [ ] Forms submit
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Works in all browsers

### Automated Testing (Future)

We plan to add:
- Unit tests (Jest)
- E2E tests (Playwright)
- CI/CD (GitHub Actions)

---

## 📚 Documentation

### When to Update Docs

Update documentation when you:

- Add new features
- Change configuration options
- Modify build process
- Add new scripts
- Change file structure

### Documentation Files

- `README.md` - Main overview
- `docs/TEMPLATE_SETUP.md` - Setup guide
- `docs/CUSTOMIZATION.md` - Customization guide
- `docs/DEPLOYMENT.md` - Deployment guide
- `docs/TROUBLESHOOTING.md` - Common issues
- `docs/CONTRIBUTING.md` - This file

### Documentation Style

```markdown
<!-- ✅ Use clear headings -->
## Feature Name

<!-- ✅ Provide context -->
This feature allows users to...

<!-- ✅ Show examples -->
```javascript
// Example code
const example = 'value';
```

<!-- ✅ Explain steps -->
1. First step
2. Second step
3. Third step

<!-- ✅ Add notes/warnings -->
> **Note:** Important information

> **Warning:** Be careful with this
```

---

## 🏆 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## 📞 Questions?

- 💬 [Discussions](https://github.com/yourusername/modern-portfolio-template/discussions)
- ✉️ Email: your-email@example.com
- 🐛 [Issues](https://github.com/yourusername/modern-portfolio-template/issues)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! Your help makes this project better for everyone. 🙌
