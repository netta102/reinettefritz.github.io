const fs = require('fs');
const path = require('path');

// Load template configuration if available
let templateConfig = null;
const configPath = path.join(__dirname, '../config/template.config.js');

if (fs.existsSync(configPath)) {
    try {
        templateConfig = require(configPath);
        console.log('✓ Loaded template configuration\n');
    } catch (error) {
        console.log(`⚠️  Warning: Could not load template.config.js: ${error.message}\n`);
    }
}

function parseFrontmatter(content) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) return { metadata: {}, content: content };
    
    const frontmatterText = match[1];
    const mainContent = match[2];
    const metadata = {};
    
    frontmatterText.split(/\r?\n/).forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        if (key === 'tags') {
            // Handle both array format [tag1, tag2] and comma-separated
            if (value.startsWith('[') && value.endsWith(']')) {
                metadata[key] = value
                    .slice(1, -1)
                    .split(',')
                    .map(tag => tag.trim().replace(/['"]/g, ''));
            } else {
                metadata[key] = value.split(',').map(tag => tag.trim());
            }
        } else {
            metadata[key] = value;
        }
    });
    
    return { metadata, content: mainContent };
}

// Build blog posts
console.log('Building blog posts...');
const blogPostsDir = path.join(__dirname, '../content/blog/posts');
const blogPosts = [];

// Check if blog posts directory exists
if (!fs.existsSync(blogPostsDir)) {
    console.log('⚠️  Blog posts directory not found, creating empty blog posts array');
} else {
    const blogDirs = fs.readdirSync(blogPostsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    console.log(`Found ${blogDirs.length} blog post directories in content/blog/posts`);

    blogDirs.forEach(slug => {
        const postIndexPath = path.join(blogPostsDir, slug, 'index.md');
        
        // Skip if index.md doesn't exist
        if (!fs.existsSync(postIndexPath)) {
            console.log(`  ⚠️  Warning: ${slug}/index.md not found, skipping...`);
            return;
        }
    
    console.log(`  Processing blog post: ${slug}`);
    const content = fs.readFileSync(postIndexPath, 'utf8');
    const { metadata, content: markdown } = parseFrontmatter(content);
    
    // Extract excerpt from content (skip title, get first paragraph)
    const lines = markdown.trim().split('\n');
    let excerpt = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('#')) {
            excerpt = line.substring(0, 200);
            if (excerpt.length === 200) excerpt += '...';
            break;
        }
    }
    
    // Check for assets directory
    const assetsDir = path.join(blogPostsDir, slug, 'assets');
    const hasAssets = fs.existsSync(assetsDir);
    
    // Helper function to handle image paths
    const getImagePath = (imagePath) => {
        if (!imagePath) return '';
        // If it's an external URL (starts with http:// or https://), return as-is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        // Otherwise, prepend the blog post path
        return `content/blog/posts/${slug}/${imagePath}`;
    };
    
    blogPosts.push({
        slug,
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString().split('T')[0],
        tags: metadata.tags || [],
        author: metadata.author || 'Tian Pretorius',
        image: getImagePath(metadata.image || metadata.coverImage),
        coverImage: getImagePath(metadata.coverImage),
        tldr: metadata.tldr || '',
        content: markdown,
        excerpt: excerpt || markdown.substring(0, 200) + '...',
        assetsPath: hasAssets ? `content/blog/posts/${slug}/assets/` : '',
        postPath: `content/blog/posts/${slug}/`
    });
});
}

// Sort blog posts by date (newest first)
blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
    path.join(dataDir, 'blog-posts.json'),
    JSON.stringify(blogPosts, null, 2)
);
console.log(`✓ Built ${blogPosts.length} blog posts`);

// Build projects
console.log('\nBuilding projects...');
const projectsDir = path.join(__dirname, '../content/projects/posts');
const projects = [];

// Check if projects directory exists
if (!fs.existsSync(projectsDir)) {
    console.log('⚠️  Projects directory not found, creating empty projects array');
} else {
    const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    console.log(`Found ${projectDirs.length} project directories in content/projects/posts`);

    projectDirs.forEach(slug => {
    const projectIndexPath = path.join(projectsDir, slug, 'index.md');
    
    // Skip if index.md doesn't exist
    if (!fs.existsSync(projectIndexPath)) {
        console.log(`  ⚠️  Warning: ${slug}/index.md not found, skipping...`);
        return;
    }
    
    console.log(`  Processing project: ${slug}`);
    const content = fs.readFileSync(projectIndexPath, 'utf8');
    const { metadata, content: markdown } = parseFrontmatter(content);
    
    // Check for assets directory
    const assetsDir = path.join(projectsDir, slug, 'assets');
    const hasAssets = fs.existsSync(assetsDir);
    
    // Helper function to handle image paths
    const getImagePath = (imagePath) => {
        if (!imagePath) return '';
        // If it's an external URL (starts with http:// or https://), return as-is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        // Otherwise, prepend the project path
        return `content/projects/posts/${slug}/${imagePath}`;
    };
    
    projects.push({
        slug,
        title: metadata.title || 'Untitled',
        description: metadata.description || '',
        tags: metadata.tags || [],
        demo: metadata.demo || '',
        github: metadata.github || '',
        image: getImagePath(metadata.image || metadata.coverImage),
        coverImage: getImagePath(metadata.coverImage),
        date: metadata.date || '',
        content: markdown,
        assetsPath: hasAssets ? `content/projects/posts/${slug}/assets/` : '',
        projectPath: `content/projects/posts/${slug}/`
    });
});
}

// Sort projects by date (newest first)
projects.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
});

fs.writeFileSync(
    path.join(dataDir, 'projects.json'),
    JSON.stringify(projects, null, 2)
);
console.log(`✓ Built ${projects.length} projects`);

// Build dev docs
console.log('\nBuilding dev docs...');
const devDocsDir = path.join(__dirname, '../DevDocs');
const devDocs = [];

const devFiles = fs.readdirSync(devDocsDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
    .map(dirent => dirent.name);
console.log(`Found ${devFiles.length} dev doc files in DevDocs`);

devFiles.forEach(filename => {
    const filePath = path.join(devDocsDir, filename);
    const slug = filename.replace('.md', '');
    
    console.log(`  Processing dev doc: ${filename}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title from first line (assuming it's a H1)
    const lines = content.trim().split('\n');
    let title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Default title from filename
    if (lines[0] && lines[0].startsWith('# ')) {
        title = lines[0].substring(2).trim();
    }
    
    // Extract excerpt from content (skip title, get first paragraph)
    let excerpt = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('#')) {
            excerpt = line.substring(0, 200);
            if (excerpt.length === 200) excerpt += '...';
            break;
        }
    }
    
    devDocs.push({
        slug,
        title,
        content,
        excerpt: excerpt || content.substring(0, 200) + '...',
        filename
    });
});

// Sort dev docs alphabetically by title
devDocs.sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(
    path.join(dataDir, 'dev-docs.json'),
    JSON.stringify(devDocs, null, 2)
);
console.log(`✓ Built ${devDocs.length} dev docs`);

console.log('\n✅ Build complete!');
console.log(`   - data/blog-posts.json (${blogPosts.length} posts)`);
console.log(`   - data/projects.json (${projects.length} projects)`);
console.log(`   - data/dev-docs.json (${devDocs.length} docs)`);

// Update site-content.json with template config if available
if (templateConfig) {
    console.log('\n🔄 Updating site-content.json with template configuration...');
    const siteContentPath = path.join(dataDir, 'site-content.json');
    
    let siteContent = {};
    if (fs.existsSync(siteContentPath)) {
        siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf8'));
    }
    
    // Update personal information
    if (templateConfig.personal) {
        siteContent.personal = siteContent.personal || {};
        siteContent.personal.name = templateConfig.personal.name;
        siteContent.personal.title = templateConfig.personal.title;
        siteContent.personal.email = templateConfig.personal.email;
        
        // Update social links
        if (templateConfig.social) {
            siteContent.personal.social = siteContent.personal.social || {};
            siteContent.personal.social.github = templateConfig.social.github.startsWith('http') 
                ? templateConfig.social.github 
                : `https://github.com/${templateConfig.social.github}`;
            siteContent.personal.social.linkedin = templateConfig.social.linkedin;
            siteContent.personal.social.email = `mailto:${templateConfig.personal.email}`;
            
            if (templateConfig.social.twitter) {
                siteContent.personal.social.twitter = templateConfig.social.twitter.startsWith('http')
                    ? templateConfig.social.twitter
                    : `https://twitter.com/${templateConfig.social.twitter}`;
            }
        }
    }
    
    // Update hero section
    if (siteContent.hero && templateConfig.personal) {
        siteContent.hero.name = templateConfig.personal.name;
        siteContent.hero.greeting = siteContent.hero.greeting || "Hi, I'm";
    }
    
    // Update site metadata
    if (templateConfig.site) {
        siteContent.site = siteContent.site || {};
        siteContent.site.title = templateConfig.site.title;
        siteContent.site.description = templateConfig.site.description;
        siteContent.site.url = templateConfig.site.url;
        siteContent.site.repository = templateConfig.site.repository;
    }
    
    // Save feature flags for client-side use
    if (templateConfig.features) {
        siteContent.features = templateConfig.features;
    }
    
    // Save theme configuration
    if (templateConfig.theme) {
        siteContent.theme = templateConfig.theme;
    }
    
    // Save resume configuration
    if (templateConfig.resume) {
        siteContent.resume = templateConfig.resume;
    }
    
    fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 2));
    console.log('✓ Updated site-content.json with configuration');
}

console.log('\n');
