/* =========================================================
   Site behaviour: theme toggle + rendering the post lists.
   You rarely need to edit this file.
   ========================================================= */

/* ---------- Theme toggle (remembers your choice) ---------- */

(function theme() {
  const root = document.documentElement;

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const isDark = () =>
    root.getAttribute("data-theme") === "dark" ||
    (!root.hasAttribute("data-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const paint = () => {
    btn.textContent = isDark() ? "☀" : "☾";
    btn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
  };
  paint();

  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    paint();
  });
})();

/* ---------- Post lists ---------- */

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/* Renders POSTS into an element.
   base   — path prefix to blog/posts/ from the current page
   limit  — max posts to show (omit for all)
   detail — true to also show the summary line  */
function renderPosts(elementId, base, limit, detail) {
  const el = document.getElementById(elementId);
  if (!el || typeof POSTS === "undefined") return;

  const list = limit ? POSTS.slice(0, limit) : POSTS;

  if (!list.length) {
    el.innerHTML = '<li style="border:0"><span class="meta">No posts yet.</span></li>';
    return;
  }

  el.innerHTML = list
    .map(function (p) {
      return (
        '<li>' +
        '<a href="' + base + p.file + '">' + p.title + '</a>' +
        '<span class="meta">' + formatDate(p.date) + '</span>' +
        (detail && p.summary ? '<p class="summary">' + p.summary + '</p>' : '') +
        '</li>'
      );
    })
    .join("");
}
