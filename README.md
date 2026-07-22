# Divya S Rajput — Portfolio

A personal portfolio built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step. Open `index.html` in a browser and it works.

The design is editorial: warm paper-and-ink palette, a single clay accent, serif display type (Fraunces) paired with Inter, and hairline rules instead of cards. Dark mode is warm ink, toggled from the nav and persisted in `localStorage`.

## Folder structure

```
Resume Website/
├── index.html          # All content and structure (edit text here)
├── styles.css          # Design tokens, typography, layout, responsive rules
├── script.js           # Interactions + the GitHub repo data (REPOS array)
├── robots.txt          # Search-engine rules (update the domain)
├── sitemap.xml         # Sitemap (update the domain)
├── README.md
└── assets/
    ├── Divya_Rajput_Resume.pdf   # Linked from "View resume" buttons
    └── favicon.svg               # Browser-tab icon
```

## Deploy to Netlify (no configuration needed)

**Option A — drag and drop (fastest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `Resume Website` folder onto the page
3. Done — Netlify gives you a `*.netlify.app` URL

**Option B — from Git (auto-deploys on push):**
1. Push this folder to a GitHub repository
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo
3. Leave *build command* empty and set *publish directory* to the repo root
4. Deploy

**After deploying**, replace `https://YOUR-SITE.netlify.app/` with your real URL in:
- `index.html` — the `<link rel="canonical">`, Open Graph, Twitter, and JSON-LD tags
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — the `<loc>` entry

## Replace the placeholders

The site never invents information; anything missing is a clearly-marked placeholder. Search `index.html` for `PLACEHOLDER` to find them all:

| Placeholder | Where | What to do |
|---|---|---|
| OG image | `<head>` | Add a 1200×630 `assets/og-image.png` for link previews |
| Site URL | `<head>`, robots.txt, sitemap.xml | Your deployed domain |

All site images are in place — the portrait (`assets/profile.jpg`), case-study covers (`assets/seatsync.jpg`, `assets/renest.jpg`, 21:9), and hackathon thumbnails (`assets/visionmate.jpg`, `assets/insightforge.jpg`, `assets/karuna.jpg`, 16:9). To change any of them, overwrite the file; full-resolution originals live in `~/Downloads`. The unreferenced `seatsync.png` / `renest.png` originals still sit in `assets/` and can be deleted before deploying to save ~3.7 MB.

### Swap the portrait

The About section displays `assets/profile.jpg` (640×800, 4:5, ~107 KB). To change it, just overwrite that file with another 4:5 image (JPEG under ~150 KB recommended) — no HTML changes needed.

## Update projects

- **Case studies** (SeatSync, ReNest) live in `index.html` under `<!-- ============ SELECTED WORK ============ -->`. Each is an `<article class="case">` with a cover-image slot, Problem / Approach / sketch / lessons in the main column, and facts + metrics in the aside. Copy one to add another case study.
- **Smaller projects** are `<a class="project-row">` items in the same section — title, one-line description, meta line, link.
- **GitHub repo tiles** are generated from the `REPOS` array at the top of `script.js`. Add or remove an object to change the grid:

```js
{ name: "repo-name", cat: "agents",        // agents | llm | ml | web
  lang: "Python",
  desc: "One-sentence description.",
  topics: ["tag-1", "tag-2"],
  url: "https://github.com/Divya1S/repo-name" },
```

## Keep the content fresh

Two things on the page are snapshots that won't update themselves:

- **Writing (Medium posts):** the list in the `WRITING` section of `index.html` was pulled from your RSS feed (`https://medium.com/feed/@drajput_14416`). When you publish a new post, copy an existing `<a class="post-row">` block and update the title and URL (the design intentionally shows no dates).
- **LeetCode stats:** the "313 problems solved — 180 medium, 49 hard" line in the Recognition list was fetched from LeetCode's API on 2026-07-21. Update the numbers occasionally as you solve more. The "56 public repositories" count in the same list and the GitHub section intro are from the same date.
- **Hackathons:** the three gallery cards were pulled from your Devpost profile (devpost.com/drajput) on 2026-07-21. To add a new hackathon, copy an `<a class="hack-card">` block in the `HACKATHONS` section — use `hack-status is-win` for wins, plain `hack-status` otherwise.

The two Springer publications in the Research section are cited from Crossref DOI metadata and shouldn't need changes.

## Customize colors

All colors are CSS variables at the top of `styles.css` — a deliberately small palette:

```css
:root {
  --bg: #faf9f7;        /* primary background (warm paper) */
  --bg-2: #f1efea;      /* secondary neutral surface       */
  --ink: #1a1915;       /* text and solid elements         */
  --accent: #a14e1e;    /* the single accent (clay)        */
  --success: #3e7a4f;   /* availability dot                */
  --warning: #9c7514;   /* reserved for caution tags       */
  ...
}
[data-theme="dark"] { ... }   /* warm-ink dark overrides */
```

Change `--accent` in both themes and every link, label, active tab, and hover state follows. Keep the accent dark enough for 4.5:1 contrast against `--bg` if you swap it.

Typography: headings use Fraunces (serif), everything else Inter — both loaded from Google Fonts in `index.html`. To change faces, update that `<link>` and the `--serif` / `--sans` variables.

## Notes

- **Accessibility:** semantic landmarks, skip link, focus-visible styles, ARIA labels, WCAG-conscious contrast, and full `prefers-reduced-motion` support (animation is disabled for those users).
- **Performance:** no external JS, two font families with `display=swap`, inline SVG icons, and transform/opacity-only animation.
- **SEO:** meta description, Open Graph + Twitter cards, canonical URL, JSON-LD `Person` structured data, robots.txt, and sitemap.xml.
