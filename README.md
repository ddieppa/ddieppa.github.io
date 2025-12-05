# Daniel Dieppa - Personal Blog

A modern personal developer blog built with Astro and Tailwind CSS v4.

## Features

- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Content Collections**: Type-safe blog posts with Markdown support
- **Draft System**: Posts with `draft: true` are hidden in production
- **Full-Text Search**: Client-side search powered by Fuse.js
- **Tag System**: Browse posts by categories
- **Reading Time**: Auto-calculated based on content length
- **Table of Contents**: Auto-generated from headings
- **Code Highlighting**: Shiki with multiple theme support
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards

## Tech Stack

- [Astro](https://astro.build) v5.x - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com) v4.x - Utility-first CSS
- [Fuse.js](https://fusejs.io) - Fuzzy search library
- TypeScript - Type-safe development

## Project Structure

```
personal-blog/
├── src/
│   ├── components/        # Reusable UI components
│   ├── content/
│   │   └── blog/          # Markdown blog posts
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes
│   ├── styles/            # Global styles
│   └── utils/             # Helper functions
├── public/                # Static assets
├── astro.config.mjs       # Astro configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing Blog Posts

### Creating New Posts

Create a new Markdown file in `src/content/blog/` with the following structure:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2022-01-15
author: "Daniel Dieppa"
tags: ["dotnet", "azure", "architecture"]
draft: false  # Set to true to hide in production
---

Your content here...
```

### File Naming Convention

- Use kebab-case for filenames: `my-awesome-post.md`
- Keep filenames descriptive and concise
- Avoid special characters and spaces

### Writing Process

1. **Create Draft**: Start with `draft: true` to hide from production
2. **Write Content**: Use Markdown syntax with proper heading structure
3. **Add Code Blocks**: Include language identifiers for syntax highlighting
4. **Review**: Test locally before publishing
5. **Publish**: Set `draft: false` and deploy

### Content Guidelines

- Use proper heading hierarchy (`#`, `##`, `###`)
- Include code blocks with language identifiers
- Add relevant tags for categorization
- Write compelling descriptions for SEO
- Keep paragraphs concise and readable

### Frontmatter Options

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| title | string | Yes | - | Post title |
| description | string | Yes | - | Brief description |
| pubDate | date | Yes | - | Publication date |
| author | string | No | "Daniel Dieppa" | Post author |
| tags | string[] | No | [] | Post categories |
| draft | boolean | No | false | Hide in production |
| updatedDate | date | No | - | Last update date |
| image | object | No | - | Featured image |

### Publishing Process

#### Local Development

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:4321`
   - Draft posts are visible in development
   - Test formatting, links, and images

2. **Review Your Post**:
   - Check heading hierarchy
   - Verify code syntax highlighting
   - Test all links and images
   - Review mobile responsiveness

#### Publishing to Production

1. **Finalize Content**:
   - Set `draft: false` in frontmatter
   - Update `pubDate` to today's date
   - Add relevant tags

2. **Build and Deploy**:
   ```bash
   # Build the site
   npm run build
   
   # Preview before deploy (optional)
   npm run preview
   ```

3. **Deployment**:
   - The blog is configured for `https://danieldieppa.dev`
   - Deploy using your preferred hosting platform
   - Common options: Vercel, Netlify, GitHub Pages

#### Post-Publishing

- **SEO**: Verify meta tags and Open Graph data
- **Social**: Share on social media platforms
- **Analytics**: Monitor traffic and engagement
- **Updates**: Use `updatedDate` when modifying posts

### Code Examples

The blog supports syntax highlighting for multiple languages:

```javascript
// JavaScript example
function greet(name) {
    console.log(`Hello, ${name}!`);
}
```

```csharp
// C# example
public class Example {
    public string Name { get; set; }
}
```

```powershell
# PowerShell example
Write-Host "Hello, World!"
```

### Supported Languages

- JavaScript/TypeScript
- C#/.NET
- PowerShell
- HTML/CSS
- JSON/YAML
- Bash/Shell
- And many more...

## Pages

- `/` - Blog listing (home)
- `/blog/[slug]` - Individual posts
- `/tags` - All tags
- `/tags/[tag]` - Posts by tag
- `/about` - About page
- `/resume` - Resume/CV
- `/uses` - Gear and software I use

## Customization

### Theme Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --gradient-start: #0ea5e9;
  --gradient-end: #8b5cf6;
  /* ... more variables */
}
```

### Social Links

Update links in `src/components/SocialLinks.astro`

### Site Configuration

Update site URL in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-domain.com',
  // ...
});
```

## License

MIT License - Feel free to use this as a template for your own blog!
