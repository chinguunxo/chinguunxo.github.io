# My Personal Website <3

A minimal personal site built with [Jekyll](https://jekyllrb.com/), hosted on GitHub Pages.

---

## 🚀 Setup (one time)

1. **Create a GitHub repo** named exactly `yourusername.github.io`
2. **Upload all these files** to that repo (drag & drop in the GitHub UI, or `git push`)
3. **Go to Settings → Pages** → Source: `main` branch → Save
4. Your site will be live at `https://yourusername.github.io` in ~1 minute

---

## ✏️ Customizing your info

Open `_config.yml` and update:

```yaml
title: "Your Name"
description: "Your tagline"
author:
  name: "Your Name"
  email: "you@email.com"
  bio: "A short sentence about you."
  location: "City, Country"
  github: "yourusername"
  twitter: "yourhandle"       # remove if not using
  linkedin: "yourlinkedin"
```

Then update `index.html` to fill in your real experience, projects, and about text.

---

## 📝 Writing a new blog post

1. Create a new file in `_posts/` named like:
   ```
   YYYY-MM-DD-your-post-title.md
   ```
   For example: `2025-06-10-my-thoughts-on-rust.md`

2. Add this at the top of the file:
   ```markdown
   ---
   layout: post
   title: "Your Post Title"
   subtitle: "Optional subtitle"   # delete this line if you don't want one
   date: 2025-06-10
   tags: [tag1, tag2]              # optional
   ---

   Your content here, written in normal Markdown.
   ```

3. Commit and push to GitHub → it publishes automatically!

### Markdown cheatsheet for posts

```markdown
## Heading 2
### Heading 3

**bold** and *italic*

- bullet list
- item two

1. numbered list
2. item two

> A blockquote looks like this

[link text](https://example.com)

![alt text](image-url.jpg)

`inline code`

\`\`\`javascript
// code block
const x = 1;
\`\`\`
```

---

## 📁 File structure

```
├── _config.yml          ← your site settings & personal info
├── _layouts/
│   ├── default.html     ← shared header/footer
│   └── post.html        ← blog post template
├── _posts/              ← ✨ drop new .md files here to blog
│   └── YYYY-MM-DD-title.md
├── assets/
│   ├── css/style.css    ← all styling
│   └── js/main.js       ← nav toggle, scroll
├── index.html           ← homepage (edit your bio/projects here)
├── blog.html            ← auto-generated blog listing
└── Gemfile              ← for local preview (optional)
```

---

## 🖥️ Local preview (optional)

If you want to preview changes before pushing:

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# → open http://localhost:4000
```

---

## 🎨 Changing colors or fonts

Open `assets/css/style.css` and edit the variables at the top:

```css
:root {
  --bg:         #f8f6f1;   /* page background */
  --bg-alt:     #f0ede6;   /* alternate section bg */
  --text:       #1c1b18;   /* main text */
  --text-muted: #7a7468;   /* secondary text */
  --accent:     #4a6741;   /* links & highlights */
}
```
