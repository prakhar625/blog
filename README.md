# Thought Garden 🪴

A custom-built static blog generator for publishing markdown posts as a static HTML website.

[![Deploy static content to Pages](https://github.com/prakhar625/blog-2024/actions/workflows/static.yml/badge.svg)](https://github.com/prakhar625/blog-2024/actions/workflows/static.yml) [![Node.js CI](https://github.com/prakhar625/blog-2024/actions/workflows/node.js.yml/badge.svg)](https://github.com/prakhar625/blog-2024/actions/workflows/node.js.yml)

## Project Structure

```
/blog
├── build.js              # Main build script
├── package.json          # Dependencies & npm scripts
├── src/
│   ├── posts/           # Published markdown articles
│   ├── drafts/          # Work-in-progress (ignored by build)
│   ├── templates/       # HTML templates (header, footer, index, post)
│   ├── styles/          # CSS
│   ├── scripts/         # Client-side JavaScript
│   └── images/videos/audio/  # Media assets
├── output/              # Generated static site (deployment target)
└── .github/workflows/   # CI/CD for GitHub Pages
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher

### Installation

```bash
npm install
```

### Development

```bash
# Build the static site
npm run build

# Serve locally on port 8080
npm run serve

# Auto-rebuild on file changes
npm run watch
```

## Writing Posts

Create a new markdown file in `src/posts/` with YAML front matter:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
cover_image: ../images/cover.jpg
excerpt: A brief summary of your post
tags: ['Tag1', 'Tag2']
---

Your markdown content here...
```

### Front Matter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title displayed on the page |
| `date` | Yes | Publication date (used for sorting) |
| `cover_image` | No | Path to cover image or video |
| `excerpt` | No | Brief summary for post listings |
| `tags` | No | Array of tags for categorization |

## Build Process

The build script (`build.js`) performs the following steps:

1. **Parse Markdown**: Reads all `.md` files from `src/posts/`
2. **Extract Metadata**: Parses YAML front matter for title, date, tags, etc.
3. **Convert to HTML**: Transforms markdown to HTML using `markdown-it`
4. **Apply Templates**: Injects content into HTML templates
5. **Generate Index**: Creates homepage with posts sorted by date (newest first)
6. **Copy Assets**: Copies styles, scripts, and media to `output/`

## Features

### Smart Media Handling

The same markdown image syntax works for different media types:

```markdown
![Alt text](../images/photo.jpg)   <!-- Renders as <img> -->
![Alt text](../videos/clip.mp4)    <!-- Renders as <video> -->
![Alt text](../audio/sound.mp3)    <!-- Renders as <audio> -->
```

### Task Lists

Markdown checkboxes render with custom styling:

```markdown
- [ ] Unchecked item  → ☐ Unchecked item
- [x] Checked item    → ✅ ~~Checked item~~
```

### Collapsible Sections

Use HTML5 `<details>` for accordion-style content:

```html
<details>
<summary>Click to expand</summary>
Hidden content here...
</details>
```

### Draft System

Files in `src/drafts/` are not processed during build, allowing you to work on posts without publishing them.

## Deployment

The site automatically deploys to GitHub Pages when you push to `main`:

1. Push changes to `main` branch
2. GitHub Actions runs the build
3. Static files are deployed to GitHub Pages

## Dependencies

- **markdown-it**: Markdown parser and compiler

## License

MIT
