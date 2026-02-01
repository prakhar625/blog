const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const strikethrough = require("markdown-it-strikethrough-alt");
const mark = require("markdown-it-mark");

const md = new MarkdownIt({
  html: true,
  linkify: true,     // Auto-convert URLs to clickable links
  typographer: true, // Smart quotes, dashes, ellipsis
  breaks: true,      // Convert newlines to <br>
})
  .use(strikethrough) // ~~strikethrough~~
  .use(mark);         // ==highlighted==

// Read the header and footer templates
const headerTemplate = fs.readFileSync(
  path.join(__dirname, "src", "templates", "header.html"),
  "utf8"
);
const footerTemplate = fs.readFileSync(
  path.join(__dirname, "src", "templates", "footer.html"),
  "utf8"
);

// Create the output directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, "output"))) {
  fs.mkdirSync(path.join(__dirname, "output"));
}

// Custom rendering rules for video, audio, and image elements with captions
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const src = token.attrs[token.attrIndex("src")][1];
  const alt = token.content;

  let mediaElement = "";

  if (src.startsWith("../videos/")) {
    const type = "video/" + path.extname(src).slice(1);
    mediaElement = `<video controls autoplay loop muted playsinline><source src="${src}" type="${type}"></video>`;
  } else if (src.startsWith("../audio/")) {
    const type = "audio/" + path.extname(src).slice(1);
    mediaElement = `<audio controls><source src="${src}" type="${type}"></audio>`;
  } else {
    mediaElement = `<img src="${src}" alt="${alt}">`;
  }

  const captionToken = tokens[idx + 2];
  const caption =
    captionToken && captionToken.type === "text" ? captionToken.content : "";

  if (caption) {
    tokens[idx + 2].content = ""; // Clear the caption token content
    return `<figure>${mediaElement}<figcaption>${caption}</figcaption></figure>`;
  } else {
    return mediaElement;
  }
};

// Remove unnecessary <p> tags around media elements
md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx + 1];

  if (token && token.type === "inline" && token.content.startsWith("!")) {
    return "";
  }

  return "<p>";
};

md.renderer.rules.paragraph_close = (tokens, idx, options, env, self) => {
  const token = tokens[idx - 1];

  if (token && token.type === "inline" && token.content.startsWith("!")) {
    return "";
  }

  return "</p>";
};

md.renderer.rules.list_item_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const taskListItem = token.attrGet("class") === "task-list-item";
  const checked = token.attrGet("checked") === "true";

  if (taskListItem) {
    const checkbox = checked ? "✅" : "☐";
    const textDecoration = checked ? "text-decoration: line-through;" : "";
    return `<li style="${textDecoration}">${checkbox} `;
  }

  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.details_open = function (tokens, idx) {
  return "<details>";
};

md.renderer.rules.details_close = function (tokens, idx) {
  return "</details>";
};

md.renderer.rules.summary_open = function (tokens, idx) {
  return "<summary>";
};

md.renderer.rules.summary_close = function (tokens, idx) {
  return "</summary>";
};



// embeds
md.renderer.rules.embed_open = function (tokens, idx) {
  const src = tokens[idx].attrs[0][1];
  
  if (src.includes('youtube.com/embed/')) {
    return `<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="${src}" allowfullscreen></iframe></div>`;
  } else {
    return `<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="${src}"></iframe></div>`;
  }
};
md.renderer.rules.embed_close = function (tokens, idx) {
  return '';
};

md.renderer.rules.paragraph_open = function (tokens, idx) {
  const embeddedContent = tokens[idx + 1] && tokens[idx + 1].type === 'inline' && tokens[idx + 1].content.startsWith('<embed');  
  if (embeddedContent) {
    return '';
  }
  return '<p>';
};

md.renderer.rules.paragraph_close = function (tokens, idx) {
  const embeddedContent = tokens[idx - 1] && tokens[idx - 1].type === 'inline' && tokens[idx - 1].content.startsWith('<embed');
  if (embeddedContent) {
    return '';
  }
  return '</p>';
};

// Process each Markdown file
const posts = [];
fs.readdirSync(path.join(__dirname, "src", "posts")).forEach((file) => {
  if (path.extname(file) === ".md") {
    const markdown = fs.readFileSync(
      path.join(__dirname, "src", "posts", file),
      "utf8"
    );
    const { attributes, body } = extractFrontMatter(markdown);
    const htmlContent = md.render(body);

    const postTemplate = fs.readFileSync(
      path.join(__dirname, "src", "templates", "post.html"),
      "utf8"
    );
    const isVideo =
      attributes.cover_image &&
      (attributes.cover_image.endsWith(".mp4") ||
        (attributes.cover_image.startsWith("http") &&
          attributes.cover_image.includes(".mp4")));
    const postHtml = postTemplate
      .replace(/\{\{header\}\}/g, headerTemplate)
      .replace(/\{\{title\}\}/g, attributes.title)
      .replace(/\{\{date\}\}/g, attributes.date)
      .replace(/\{\{cover_image\}\}/g, attributes.cover_image || "")
      .replace(/\{\{is_video\}\}/g, isVideo ? "true" : "false")
      .replace(/\{\{\{content\}\}\}/g, htmlContent)
      .replace(/\{\{footer\}\}/g, footerTemplate)
      .replace(
        /\{\{#cover_image\}\}([\s\S]*?)\{\{\/cover_image\}\}/g,
        attributes.cover_image ? "$1" : ""
      )
      .replace(
        /\{\{#is_video\}\}([\s\S]*?)\{\{\/is_video\}\}/g,
        isVideo ? "$1" : ""
      )
      .replace(
        /\{\{\^is_video\}\}([\s\S]*?)\{\{\/is_video\}\}/g,
        isVideo ? "" : "$1"
      );

    const outputFile = path.join(
      __dirname,
      "output",
      "posts",
      `${path.basename(file, ".md")}.html`
    );
    fs.writeFileSync(outputFile, postHtml);

    posts.push({
      title: attributes.title,
      date: new Date(attributes.date),
      url: `posts/${path.basename(file, ".md")}.html`,
      cover_image: attributes.cover_image || "",
      isVideo: isVideo,
    });
  }
});

// Sort posts by date in descending order (recent first)
posts.sort((a, b) => b.date - a.date);

// Generate the index.html file
const indexTemplate = fs.readFileSync(
  path.join(__dirname, "src", "templates", "index.html"),
  "utf8"
);
const recentPosts = posts
  .map(
    (post) => `
    <li class="recent-posts__list-item">
      <a class="recent-posts__list-el-a" href="${post.url}">${post.title}</a>
      <span class="recent-posts__list-el-date">${post.date.toLocaleDateString()}</span>
    </li>
  `
  )
  .join("");

const indexHtml = indexTemplate
  .replace("{{header}}", headerTemplate)
  .replace("{{recent_posts}}", recentPosts)
  .replace("{{footer}}", footerTemplate);

fs.writeFileSync(path.join(__dirname, "output", "index.html"), indexHtml);

// Copy the styles, scripts, images, videos, and audio directories to the output directory
fs.cpSync(
  path.join(__dirname, "src", "styles"),
  path.join(__dirname, "output", "styles"),
  { recursive: true }
);
fs.cpSync(
  path.join(__dirname, "src", "scripts"),
  path.join(__dirname, "output", "scripts"),
  { recursive: true }
);
fs.cpSync(
  path.join(__dirname, "src", "images"),
  path.join(__dirname, "output", "images"),
  { recursive: true }
);
fs.cpSync(
  path.join(__dirname, "src", "videos"),
  path.join(__dirname, "output", "videos"),
  { recursive: true }
);
fs.cpSync(
  path.join(__dirname, "src", "audio"),
  path.join(__dirname, "output", "audio"),
  { recursive: true }
);

// Extract front matter from Markdown content
function extractFrontMatter(markdown) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const matches = markdown.match(frontMatterRegex);

  if (!matches) {
    return { attributes: {}, body: markdown };
  }

  const frontMatter = matches[1];
  const body = matches[2];

  const attributes = {};
  frontMatter.split("\n").forEach((line) => {
    const [key, value] = line.split(":").map((item) => item.trim());
    attributes[key] = value;
  });

  return { attributes, body };
}
