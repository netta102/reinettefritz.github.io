// Clean example content from Modern Portfolio Template
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.toLowerCase().trim());
        });
    });
}

async function cleanExampleContent() {
    console.log('\n🧹 Modern Portfolio Template - Clean Example Content\n');
    console.log('This will remove:');
    console.log('  • Example blog posts (3 posts)');
    console.log('  • Example projects (3 projects)');
    console.log('  • 3D Home Office viewer');
    console.log('  • Example images (profile.png, door.gif)');
    console.log('  • Generated JSON files\n');
    
    const answer = await askQuestion('Are you sure you want to continue? (yes/no): ');
    
    if (answer !== 'yes' && answer !== 'y') {
        console.log('\n❌ Cancelled. No files were deleted.\n');
        rl.close();
        return;
    }
    
    console.log('\n🗑️  Cleaning example content...\n');
    
    let deletedCount = 0;
    
    // 1. Clean blog posts
    const blogDir = path.join(__dirname, '../content/blog/posts');
    const exampleBlogPosts = [
        '1-particle-detection-rd',
        '2-food-fortification-industry',
        '3-building-this-portfolio'
    ];
    
    exampleBlogPosts.forEach(post => {
        const postPath = path.join(blogDir, post);
        if (fs.existsSync(postPath)) {
            fs.rmSync(postPath, { recursive: true, force: true });
            console.log(`  ✅ Removed blog post: ${post}`);
            deletedCount++;
        }
    });
    
    // 2. Clean projects
    const projectsDir = path.join(__dirname, '../content/projects/posts');
    const exampleProjects = [
        '1-bizqr-digital-cards',
        '2-eggsplorer-platform',
        '3-portfolio-website'
    ];
    
    exampleProjects.forEach(project => {
        const projectPath = path.join(projectsDir, project);
        if (fs.existsSync(projectPath)) {
            fs.rmSync(projectPath, { recursive: true, force: true });
            console.log(`  ✅ Removed project: ${project}`);
            deletedCount++;
        }
    });
    
    // 3. Remove 3D Home Office
    const homeOfficeDir = path.join(__dirname, '../home_office');
    if (fs.existsSync(homeOfficeDir)) {
        fs.rmSync(homeOfficeDir, { recursive: true, force: true });
        console.log('  ✅ Removed 3D Home Office viewer');
        deletedCount++;
    }
    
    // 4. Remove example images
    const assetsDir = path.join(__dirname, '../assets');
    const exampleImages = [
        'profile.png',
        'door.gif'
    ];
    
    exampleImages.forEach(img => {
        const imgPath = path.join(assetsDir, img);
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
            console.log(`  ✅ Removed example image: ${img}`);
            deletedCount++;
        }
    });
    
    // 5. Remove generated JSON files (will be regenerated on build)
    const dataDir = path.join(__dirname, '../data');
    const generatedFiles = [
        'blog-posts.json',
        'projects.json'
    ];
    
    generatedFiles.forEach(file => {
        const filePath = path.join(dataDir, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`  ✅ Removed generated file: ${file}`);
            deletedCount++;
        }
    });
    
    // 6. Clean hero image flip animation from index.js
    const indexJsPath = path.join(__dirname, '../js/index.js');
    if (fs.existsSync(indexJsPath)) {
        let indexJsContent = fs.readFileSync(indexJsPath, 'utf8');
        
        // Remove hero image flip function
        const flipFunctionStart = indexJsContent.indexOf('// Hero Image Flip Animation');
        if (flipFunctionStart !== -1) {
            const flipFunctionEnd = indexJsContent.indexOf('// Initialize hero image flip when DOM is ready', flipFunctionStart);
            if (flipFunctionEnd !== -1) {
                const afterFlipInit = indexJsContent.indexOf('});', flipFunctionEnd) + 3;
                indexJsContent = indexJsContent.slice(0, flipFunctionStart) + indexJsContent.slice(afterFlipInit);
                fs.writeFileSync(indexJsPath, indexJsContent);
                console.log('  ✅ Removed hero image flip animation from index.js');
                deletedCount++;
            }
        }
    }
    
    // 7. Clean hero image HTML from index.html
    const indexHtmlPath = path.join(__dirname, '../index.html');
    if (fs.existsSync(indexHtmlPath)) {
        let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
        
        // Replace dual image setup with simple single image
        const heroImageStart = indexHtmlContent.indexOf('<div class="hero-image">');
        const heroImageEnd = indexHtmlContent.indexOf('</div>\n                </div>\n            </div>\n        </div>', heroImageStart);
        
        if (heroImageStart !== -1 && heroImageEnd !== -1) {
            const simpleHeroImage = `<div class="hero-image">
                    <div class="image-wrapper">
                        <img src="assets/profile.png" alt="Your Name">
                    </div>
                </div>`;
            
            indexHtmlContent = indexHtmlContent.slice(0, heroImageStart) + 
                             simpleHeroImage + 
                             indexHtmlContent.slice(heroImageEnd);
            
            fs.writeFileSync(indexHtmlPath, indexHtmlContent);
            console.log('  ✅ Simplified hero image in index.html');
            deletedCount++;
        }
    }
    
    // 8. Clean flip animation CSS from style.css
    const styleCssPath = path.join(__dirname, '../css/style.css');
    if (fs.existsSync(styleCssPath)) {
        let styleCssContent = fs.readFileSync(styleCssPath, 'utf8');
        
        // Remove Hero Image Flip Animation section
        const flipCssStart = styleCssContent.indexOf('/* Hero Image Flip Animation */');
        if (flipCssStart !== -1) {
            const flipCssEnd = styleCssContent.indexOf('.image-wrapper.flipped:hover .hero-img {', flipCssStart);
            if (flipCssEnd !== -1) {
                const afterFlipCss = styleCssContent.indexOf('}', flipCssEnd) + 1;
                styleCssContent = styleCssContent.slice(0, flipCssStart) + styleCssContent.slice(afterFlipCss);
                
                // Add back simple image-wrapper styles
                const simpleStyles = `
.image-wrapper {
    position: relative;
    z-index: 1;
}

.image-wrapper img {
    width: 100%;
    max-width: 320px;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    transition: transform var(--transition-slow);
}

.image-wrapper:hover img {
    transform: scale(1.02);
}
`;
                styleCssContent = styleCssContent.slice(0, flipCssStart) + simpleStyles + styleCssContent.slice(flipCssStart);
                fs.writeFileSync(styleCssPath, styleCssContent);
                console.log('  ✅ Removed flip animation CSS from style.css');
                deletedCount++;
            }
        }
    }
    
    console.log(`\n✅ Cleanup complete! Removed ${deletedCount} items.\n`);
    console.log('📝 Next steps:');
    console.log('  1. Add your profile image: assets/profile.png (400x400px recommended)');
    console.log('  2. Create your first blog post: content/blog/posts/');
    console.log('  3. Add your first project: content/projects/posts/');
    console.log('  4. Run: npm run build');
    console.log('  5. Preview: npm run dev\n');
    
    rl.close();
}

cleanExampleContent().catch(err => {
    console.error('❌ Error:', err.message);
    rl.close();
    process.exit(1);
});
