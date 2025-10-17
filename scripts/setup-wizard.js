// Modern Portfolio Template - Setup Wizard
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Check for --config-only flag
const configOnly = process.argv.includes('--config-only');

function askQuestion(question, defaultValue = '') {
    return new Promise((resolve) => {
        const prompt = defaultValue 
            ? `${question} [${defaultValue}]: `
            : `${question}: `;
        
        rl.question(prompt, (answer) => {
            resolve(answer.trim() || defaultValue);
        });
    });
}

function askYesNo(question, defaultValue = true) {
    return new Promise((resolve) => {
        const defaultStr = defaultValue ? 'Y/n' : 'y/N';
        rl.question(`${question} (${defaultStr}): `, (answer) => {
            answer = answer.toLowerCase().trim();
            if (answer === '') {
                resolve(defaultValue);
            } else {
                resolve(answer === 'y' || answer === 'yes');
            }
        });
    });
}

async function runSetupWizard() {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║                                                       ║');
    console.log('║     🎨 Modern Portfolio Template Setup Wizard 🎨     ║');
    console.log('║                                                       ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    
    if (configOnly) {
        console.log('📝 Config-only mode: Updates config/template.config.js only\n');
    } else {
        console.log('This wizard will help you set up your portfolio.\n');
        console.log('You can also manually edit config/template.config.js later.\n');
    }
    
    console.log('Press Ctrl+C at any time to cancel.\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const answers = {};
    
    // Personal Information
    console.log('👤 Personal Information\n');
    answers.name = await askQuestion('Your full name', 'John Doe');
    answers.title = await askQuestion('Your professional title', 'Software Engineer');
    answers.email = await askQuestion('Your email', 'john.doe@example.com');
    answers.location = await askQuestion('Your location (optional)', 'San Francisco, CA');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Social Links
    console.log('🔗 Social Links\n');
    answers.github = await askQuestion('GitHub username', 'johndoe');
    answers.linkedin = await askQuestion('LinkedIn profile URL', 'https://linkedin.com/in/johndoe');
    answers.twitter = await askQuestion('Twitter/X username (optional)', '');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Site Settings
    console.log('🌐 Site Settings\n');
    answers.siteUrl = await askQuestion('Your site URL', 'https://johndoe.github.io');
    answers.repository = await askQuestion('GitHub repository', 'https://github.com/johndoe/johndoe.github.io');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Features
    console.log('✨ Features\n');
    answers.enableBlog = await askYesNo('Enable blog section?', true);
    answers.enableProjects = await askYesNo('Enable projects section?', true);
    answers.enableResume = await askYesNo('Enable resume/CV download?', true);
    
    if (answers.enableResume) {
        answers.resumeFilename = await askQuestion('Resume filename', `${answers.name.replace(/\s+/g, '-')}-Resume.pdf`);
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Theme Colors
    console.log('🎨 Theme (optional - press Enter to skip)\n');
    answers.primaryColor = await askQuestion('Primary color (hex)', '#2c3e50');
    answers.accentColor = await askQuestion('Accent color (hex)', '#3498db');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Save configuration
    console.log('💾 Saving configuration...\n');
    
    const config = {
        site: {
            title: `${answers.name} - Portfolio`,
            description: `${answers.title} Portfolio`,
            url: answers.siteUrl,
            author: answers.name,
            repository: answers.repository
        },
        personal: {
            name: answers.name,
            title: answers.title,
            email: answers.email,
            location: answers.location,
            timezone: 'UTC'
        },
        social: {
            github: answers.github,
            linkedin: answers.linkedin,
            twitter: answers.twitter,
            medium: '',
            devto: ''
        },
        theme: {
            primaryColor: answers.primaryColor,
            accentColor: answers.accentColor,
            fontFamily: 'Inter, sans-serif',
            codeFontFamily: 'JetBrains Mono, monospace'
        },
        features: {
            blog: answers.enableBlog,
            projects: answers.enableProjects,
            contactForm: true,
            sectionNavigation: true,
            darkModeToggle: false
        },
        content: {
            projectsPerPage: 6,
            blogPostsPerPage: 10,
            showReadingTime: true,
            showTableOfContents: true
        },
        resume: {
            enabled: answers.enableResume,
            filename: answers.resumeFilename || ''
        }
    };
    
    // Save to config file
    const configPath = path.join(__dirname, '../config/template.config.js');
    const configContent = `// Modern Portfolio Template Configuration
// Edit this file to customize your portfolio

module.exports = ${JSON.stringify(config, null, 4)};
`;
    
    fs.writeFileSync(configPath, configContent);
    console.log('  ✅ Saved config/template.config.js');
    
    if (!configOnly) {
        // Update site-content.json
        await updateSiteContent(answers);
        
        // Update index.html with name
        await updateIndexHtml(answers);
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Ask about cleaning example content
        console.log('🧹 Example Content\n');
        const cleanContent = await askYesNo('Remove example blog posts and projects?', false);
        
        if (cleanContent) {
            console.log('\n  Run "npm run clean" when ready to remove example content.\n');
        }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Setup complete!\n');
    console.log('📝 Next steps:\n');
    console.log('  1. Replace assets/profile.png with your photo');
    console.log('  2. Replace assets/favicon.png with your favicon');
    
    if (answers.enableResume) {
        console.log(`  3. Add your resume: assets/${answers.resumeFilename}`);
    }
    
    console.log('  4. Run: npm run build');
    console.log('  5. Preview: npm run dev');
    console.log('  6. Edit content in: content/blog/ and content/projects/\n');
    
    if (!configOnly) {
        console.log('💡 Tip: Run "npm run setup:config" to update config only\n');
    }
    
    rl.close();
}

async function updateSiteContent(answers) {
    const siteContentPath = path.join(__dirname, '../data/site-content.json');
    
    if (!fs.existsSync(siteContentPath)) {
        console.log('  ⚠️  site-content.json not found, skipping update');
        return;
    }
    
    try {
        const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf8'));
        
        // Update personal info
        siteContent.personal = siteContent.personal || {};
        siteContent.personal.name = answers.name;
        siteContent.personal.email = answers.email;
        siteContent.personal.social = siteContent.personal.social || {};
        siteContent.personal.social.github = `https://github.com/${answers.github}`;
        siteContent.personal.social.linkedin = answers.linkedin;
        
        // Update hero section
        if (siteContent.hero) {
            siteContent.hero.name = answers.name;
            siteContent.hero.greeting = `Hi, I'm`;
        }
        
        fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 2));
        console.log('  ✅ Updated data/site-content.json');
    } catch (error) {
        console.log(`  ⚠️  Error updating site-content.json: ${error.message}`);
    }
}

async function updateIndexHtml(answers) {
    const indexHtmlPath = path.join(__dirname, '../index.html');
    
    if (!fs.existsSync(indexHtmlPath)) {
        console.log('  ⚠️  index.html not found, skipping update');
        return;
    }
    
    try {
        let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
        
        // Update title
        indexHtml = indexHtml.replace(
            /<title>.*?<\/title>/,
            `<title>${answers.name} - ${answers.title}</title>`
        );
        
        // Update meta description
        indexHtml = indexHtml.replace(
            /<meta name="description" content=".*?">/,
            `<meta name="description" content="${answers.title} Portfolio">`
        );
        
        fs.writeFileSync(indexHtmlPath, indexHtml);
        console.log('  ✅ Updated index.html');
    } catch (error) {
        console.log(`  ⚠️  Error updating index.html: ${error.message}`);
    }
}

// Run the wizard
runSetupWizard().catch(err => {
    console.error('\n❌ Error:', err.message);
    rl.close();
    process.exit(1);
});
