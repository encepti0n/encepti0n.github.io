/* =========================================================
   Site behaviour: theme control, entrance motion, post lists.
   You rarely need to edit this file.
   ========================================================= */

/* ---------- Theme (remembers your choice) ---------- */

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
    const dark = isDark();
    btn.innerHTML =
      '<span class="swatch" aria-hidden="true"></span>' +
      '<span class="label">' + (dark ? "dark" : "light") + "</span>";
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("aria-pressed", String(dark));
  };
  paint();

  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    paint();
  });

  /* Follow the OS while no explicit choice has been made */
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (!root.hasAttribute("data-theme")) paint();
  });
})();

/* ---------- Entrance motion ----------
   Elements marked .reveal fade up once, staggered by their order
   within a group. Everything stays visible without JS or when the
   visitor asks for reduced motion. */

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--delay", i * 70 + "ms");
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------- Post lists ---------- */

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
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
    el.innerHTML =
      '<li><p class="empty">No posts yet — the first one is being written.</p></li>';
    return;
  }

  el.innerHTML = list
    .map(function (p) {
      return (
        "<li>" +
        '<a href="' + base + encodeURI(p.file) + '">' +
        "<span>" + escapeHTML(p.title) + "</span>" +
        '<time class="meta" datetime="' + escapeHTML(p.date) + '">' +
        formatDate(p.date) +
        "</time>" +
        (detail && p.summary
          ? '<p class="summary">' + escapeHTML(p.summary) + "</p>"
          : "") +
        "</a></li>"
      );
    })
    .join("");
}

/* ---------- Small shared bits ---------- */

(function footerYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
