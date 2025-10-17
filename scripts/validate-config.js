// Validate template configuration
const fs = require('fs');
const path = require('path');

function validateConfig() {
    console.log('🔍 Validating template configuration...\n');
    
    const configPath = path.join(__dirname, '../config/template.config.js');
    const siteContentPath = path.join(__dirname, '../data/site-content.json');
    
    let hasErrors = false;
    
    // Check if config file exists
    if (!fs.existsSync(configPath)) {
        console.log('⚠️  Warning: config/template.config.js not found');
        console.log('   Run "npm run setup" to create your configuration\n');
        return; // Not an error, config is optional
    }
    
    try {
        const config = require(configPath);
        
        // Validate required fields
        const required = [
            { path: 'site.title', value: config.site?.title },
            { path: 'site.author', value: config.site?.author },
            { path: 'personal.name', value: config.personal?.name },
            { path: 'personal.email', value: config.personal?.email },
            { path: 'social.github', value: config.social?.github }
        ];
        
        required.forEach(field => {
            if (!field.value || field.value.includes('Your') || field.value.includes('your')) {
                console.log(`❌ ${field.path}: needs to be configured`);
                hasErrors = true;
            } else {
                console.log(`✅ ${field.path}: ${field.value}`);
            }
        });
        
        // Validate email format
        if (config.personal?.email && !config.personal.email.includes('@')) {
            console.log('⚠️  Warning: personal.email may not be valid');
        }
        
        // Validate GitHub username format
        if (config.social?.github && (config.social.github.includes('/') || config.social.github.includes('http'))) {
            console.log('⚠️  Warning: social.github should be username only, not URL');
        }
        
        // Check if site-content.json exists
        if (!fs.existsSync(siteContentPath)) {
            console.log('\n❌ data/site-content.json not found');
            console.log('   Run "node scripts/build-content.js" to generate it');
            hasErrors = true;
        }
        
        if (hasErrors) {
            console.log('\n❌ Configuration validation failed');
            console.log('   Run "npm run setup" to fix configuration issues\n');
            process.exit(1);
        } else {
            console.log('\n✅ Configuration is valid!\n');
        }
        
    } catch (error) {
        console.log(`❌ Error loading config: ${error.message}\n`);
        process.exit(1);
    }
}

// Run validation
validateConfig();
