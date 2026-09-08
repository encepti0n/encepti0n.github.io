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
css/style.css       All styling (edit the tokens at the top to restyle everything)
js/posts.js         The list of posts — edit this when you publish
js/main.js          Theme toggle + post-list rendering
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

Everything visual comes from the variables at the top of `css/style.css`:
`--accent` is the link/highlight color, `--width` the content width, `--font`
the typeface. Change one value, every page follows.
