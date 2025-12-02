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

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2025-12-01
author: "Daniel Dieppa"
tags: ["dotnet", "azure"]
draft: false  # Set to true to hide in production
---

Your content here...
```

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

## Pages

- `/` - Blog listing (home)
- `/blog/[slug]` - Individual posts
- `/tags` - All tags
- `/tags/[tag]` - Posts by tag
- `/about` - About page
- `/resume` - Resume/CV
- `/contact` - Contact form

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
