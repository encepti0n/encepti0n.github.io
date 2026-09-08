# Personal site

Portfolio + blog. Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Files

```
index.html          Home page
projects.html       Projects
about.html          About
404.html            Shown for bad URLs
blog/index.html     Post list
blog/posts/         One HTML file per post
assets/favicon.svg  Site icon
css/style.css       All styling (edit the tokens at the top to restyle everything)
js/posts.js         The list of posts — edit this when you publish
js/main.js          Theme control, entrance motion, post-list rendering
.nojekyll           Tells GitHub Pages to serve the files as-is
```

## Working on it locally

Open `index.html` in a browser. That is the whole workflow — no server needed.

## Publishing a new post

1. Copy `blog/posts/hello-world.html` to `blog/posts/your-post-name.html`
2. Edit the three marked spots inside it: title, heading + date, body
3. Add an entry to the **top** of the list in `js/posts.js`:

```js
{
  title: "The title of the post",
  date: "2026-09-20",
  file: "your-post-name.html",
  summary: "One sentence shown on the blog index."
},
```

4. Push:

```bash
git add .
git commit -m "New post: the title"
git push
```

The live site updates in about a minute.

## Changing how it looks

Everything visual comes from the tokens at the top of `css/style.css`. The ones
worth knowing:

| Token | What it controls |
| --- | --- |
| `--accent` | The single highlight colour. There is deliberately only one. |
| `--bg`, `--surface`, `--text`, `--muted`, `--line` | The warm paper-and-ink palette |
| `--display`, `--font`, `--mono` | Headline serif, body sans, and the monospace used for dates, tags and labels |
| `--shell` | Page width (1080px) |
| `--measure` | Reading width for prose (66 characters) |
| `--grain` | Strength of the film-grain overlay — set to `0` to remove it |

Each token is redefined once for dark mode, so changing a light value means
checking its dark twin a few lines below.

Fonts come from Google Fonts via one `@import` at the top of the stylesheet. If
you would rather have no network requests at all, delete that line — the
fallback stacks (Georgia, system sans, system mono) are already in place.

### Structure worth reusing

- `.eyebrow` — the small monospace label with a rule that opens each section
- `.index` — the numbered project rows, one `<li>` per project
- `.post-list` — the blog listing, rendered from `js/posts.js`
- `.reveal` — add this class to fade an element up as it scrolls into view
