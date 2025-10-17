// Client-side configuration handler
// Loads site configuration and applies feature toggles

class ConfigHandler {
    constructor() {
        this.config = null;
        this.features = null;
    }
    
    async load() {
        try {
            const response = await fetch('data/site-content.json');
            const data = await response.json();
            this.config = data;
            this.features = data.features || {};
            return true;
        } catch (error) {
            console.warn('Could not load site configuration:', error);
            // Set defaults
            this.features = {
                blog: true,
                projects: true,
                contactForm: true,
                sectionNavigation: true
            };
            return false;
        }
    }
    
    // Get feature flag value
    isEnabled(featureName) {
        return this.features[featureName] !== false; // Default to true if not specified
    }
    
    // Get configuration value
    get(path) {
        if (!this.config) return null;
        
        const parts = path.split('.');
        let value = this.config;
        
        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                return null;
            }
        }
        
        return value;
    }
    
    // Apply feature toggles to the page
    applyFeatureToggles() {
        // Hide blog section if disabled
        if (!this.isEnabled('blog')) {
            const blogSection = document.querySelector('#blog, .blog-preview');
            if (blogSection) {
                blogSection.style.display = 'none';
            }
            
            // Remove blog navigation links
            const blogLinks = document.querySelectorAll('a[href="blog.html"], a[href="#blog"]');
            blogLinks.forEach(link => {
                const parent = link.parentElement;
                if (parent && parent.tagName === 'LI') {
                    parent.style.display = 'none';
                }
            });
        }
        
        // Hide projects section if disabled
        if (!this.isEnabled('projects')) {
            const projectsSection = document.querySelector('#projects, .projects');
            if (projectsSection) {
                projectsSection.style.display = 'none';
            }
            
            // Remove projects navigation links
            const projectLinks = document.querySelectorAll('a[href="projects.html"], a[href="#projects"]');
            projectLinks.forEach(link => {
                const parent = link.parentElement;
                if (parent && parent.tagName === 'LI') {
                    parent.style.display = 'none';
                }
            });
        }
        
        // Hide section navigation if disabled
        if (!this.isEnabled('sectionNavigation')) {
            const sectionNav = document.querySelector('.section-nav');
            if (sectionNav) {
                sectionNav.style.display = 'none';
            }
        }
        
        // Update resume link
        const resumeConfig = this.get('resume');
        if (resumeConfig && resumeConfig.enabled && resumeConfig.filename) {
            const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"], a[href*="resume.pdf"]');
            resumeLinks.forEach(link => {
                link.href = `assets/${resumeConfig.filename}`;
            });
        }
    }
    
    // Apply theme (if theme CSS is loaded, this is mostly handled by CSS)
    applyTheme() {
        const theme = this.get('theme');
        if (!theme) return;
        
        // Apply CSS variables if theme-variables.css isn't loaded
        if (!document.querySelector('link[href*="theme-variables.css"]')) {
            const style = document.createElement('style');
            style.textContent = `
                :root {
                    --theme-primary: ${theme.primaryColor || '#2c3e50'};
                    --theme-accent: ${theme.accentColor || '#3498db'};
                    --theme-font-family: ${theme.fontFamily || 'Inter, sans-serif'};
                    --theme-code-font-family: ${theme.codeFontFamily || 'JetBrains Mono, monospace'};
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize configuration
    async init() {
        await this.load();
        this.applyFeatureToggles();
        this.applyTheme();
    }
}

// Create global instance
window.ConfigHandler = new ConfigHandler();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ConfigHandler.init();
    });
} else {
    window.ConfigHandler.init();
}
