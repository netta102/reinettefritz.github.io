// Apply theme from template configuration
const fs = require('fs');
const path = require('path');

function applyTheme() {
    console.log('🎨 Applying theme from template configuration...\n');
    
    const configPath = path.join(__dirname, '../config/template.config.js');
    
    if (!fs.existsSync(configPath)) {
        console.log('⚠️  No template.config.js found, skipping theme application\n');
        return;
    }
    
    let config;
    try {
        config = require(configPath);
    } catch (error) {
        console.log(`❌ Error loading config: ${error.message}\n`);
        return;
    }
    
    if (!config.theme) {
        console.log('⚠️  No theme configuration found in template.config.js\n');
        return;
    }
    
    const theme = config.theme;
    
    // Generate CSS variables
    const cssVariables = `/* Auto-generated theme from template.config.js */
/* Do not edit manually - run 'npm run build' to regenerate */

:root {
    /* Theme Colors */
    --theme-primary: ${theme.primaryColor || '#2c3e50'};
    --theme-accent: ${theme.accentColor || '#3498db'};
    
    /* Typography */
    --theme-font-family: ${theme.fontFamily || 'Inter, sans-serif'};
    --theme-code-font-family: ${theme.codeFontFamily || 'JetBrains Mono, monospace'};
}

/* Apply theme colors */
.gradient-text {
    background: linear-gradient(135deg, var(--theme-primary), var(--theme-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.btn-primary {
    background: var(--theme-accent);
}

.btn-primary:hover {
    background: var(--theme-primary);
}

a {
    color: var(--theme-accent);
}

.section-number {
    color: var(--theme-accent);
}

/* Apply font families */
body {
    font-family: var(--theme-font-family);
}

code, pre, .code-font {
    font-family: var(--theme-code-font-family);
}
`;
    
    // Save to CSS file
    const cssDir = path.join(__dirname, '../css');
    const themeCssPath = path.join(cssDir, 'theme-variables.css');
    
    fs.writeFileSync(themeCssPath, cssVariables);
    console.log('✅ Generated css/theme-variables.css');
    
    // Check if theme CSS is referenced in HTML files
    const htmlFiles = ['index.html', 'about.html', 'blog.html', 'projects.html', 'contact.html', 'dev.html'];
    let updatedFiles = 0;
    
    htmlFiles.forEach(filename => {
        const htmlPath = path.join(__dirname, '..', filename);
        
        if (!fs.existsSync(htmlPath)) {
            return;
        }
        
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Check if theme CSS is already included
        if (htmlContent.includes('theme-variables.css')) {
            return;
        }
        
        // Add theme CSS after style.css
        const styleCssPattern = /<link rel="stylesheet" href="css\/style\.css[^"]*">/;
        
        if (styleCssPattern.test(htmlContent)) {
            htmlContent = htmlContent.replace(
                styleCssPattern,
                (match) => `${match}\n    <link rel="stylesheet" href="css/theme-variables.css">`
            );
            
            fs.writeFileSync(htmlPath, htmlContent);
            updatedFiles++;
            console.log(`✅ Added theme CSS to ${filename}`);
        }
    });
    
    if (updatedFiles > 0) {
        console.log(`\n✓ Updated ${updatedFiles} HTML files with theme CSS reference`);
    }
    
    console.log('\n🎨 Theme application complete!\n');
}

// Run if called directly
if (require.main === module) {
    applyTheme();
}

module.exports = { applyTheme };
