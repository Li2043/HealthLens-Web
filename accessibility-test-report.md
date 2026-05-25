# HealthLens Accessibility Test Report

**Project:** HealthLens — International Student Wellbeing Navigator  
**Version tested:** 0.8  
**Report date:** May 2026  
**Tester:** Project author (manual review)

---

## Test Environment

| Item | Details |
|------|---------|
| **OS** | Windows 10/11 |
| **Browsers** | Chrome (latest), Edge (latest) |
| **Local server** | `python -m http.server 8000` |
| **URL tested** | `http://localhost:8000` |
| **Viewport sizes** | 320px, 768px, 1280px |
| **Assistive technology** | Manual keyboard-only navigation; screen reader testing recommended as follow-up |
| **Colour schemes tested** | Light (default), system dark mode (`prefers-color-scheme: dark`), print preview |

> **Note:** A local server is required. Opening `index.html` directly will not load `data/resources.json`.

---

## Lighthouse Result (Placeholder)

Run in Chrome DevTools → Lighthouse → Accessibility (and Best Practices).

| Category | Score | Notes |
|----------|-------|-------|
| **Accessibility** | _[Add score after running Lighthouse]_ | Target: 90+ |
| **Best Practices** | _[Add score]_ | Check HTTPS on live GitHub Pages URL |
| **Performance** | _[Add score]_ | Static site; expected strong result |
| **SEO** | _[Add score]_ | Meta description and semantic headings present |

**How to run:**
1. Start local server: `python -m http.server 8000`
2. Open `http://localhost:8000` in Chrome
3. DevTools → Lighthouse → Analyse page load
4. Record scores above and attach screenshot to portfolio if useful

---

## axe DevTools Result (Placeholder)

Run in browser with [axe DevTools extension](https://www.deque.com/axe/devtools/).

| Scan type | Result | Notes |
|-----------|--------|-------|
| **Full page scan** | _[Add: 0 issues / X issues]_ | Run on Support Finder with all cards loaded |
| **Critical** | _[Add count]_ | |
| **Serious** | _[Add count]_ | |
| **Moderate** | _[Add count]_ | |
| **Minor** | _[Add count]_ | |

**Recommended scan areas:**
- Hero and crisis banner
- Support Finder (loaded cards + external links)
- Care Options Guide (loaded cards, Pharmacy First panel, external links)
- FAQ accordion
- Contact form (validation states)
- Print preview (visual check only)

---

## Manual Keyboard-Only Test Checklist

Test using **Tab**, **Shift+Tab**, **Enter**, and **Space** only (no mouse).

| Test | Pass? | Notes |
|------|-------|-------|
| Skip link appears on focus and jumps to main content | ✅ | `#main-content` target |
| Header navigation links reachable | ✅ | Support Finder, Care Options, Wellbeing Guides, Source Policy, FAQ, Contact |
| Care Options nav link scrolls to section | ✅ | `#care-options` target; header offset applied |
| Theme toggle reachable and usable | ✅ | `aria-pressed` updates; preference saved in `localStorage` |
| Mobile nav toggle reachable (at mobile width) | ✅ | `aria-expanded` updates |
| Search input reachable | ✅ | Label associated with input |
| Category filter buttons reachable and usable | ✅ | `aria-pressed` updates on selection |
| Resource card external links reachable | ✅ | Focus visible; opens in new tab |
| Care option card external links reachable | ✅ | Focus visible; descriptive `aria-label`; opens in new tab |
| Keyboard navigation through care option cards | ✅ | Tab order: category → title → lists → safety note → link |
| Pharmacy First panel link reachable | ✅ | Official NHS pharmacy guidance link |
| FAQ buttons reachable | ✅ | Enter/Space toggles panel |
| FAQ `aria-expanded` updates correctly | ✅ | One panel open at a time |
| Form fields reachable in logical order | ✅ | Name → Email → Topic → Message → Consent → Submit |
| Form validation messages understandable | ✅ | `role="alert"`, `aria-invalid`, focus moves to first error |
| Visible focus state throughout | ✅ | `:focus-visible` on links, buttons, inputs |
| No keyboard traps | ✅ | No modals or trapping overlays |

---

## Link and Content Safety Review

| Check | Pass? | Notes |
|-------|-------|-------|
| All support links point to official Bristol SU, UoB, NHS, or Samaritans URLs | ✅ | Defined in `data/resources.json` |
| Care option links point to official NHS or UoB URLs | ✅ | Defined in `data/care-options.json` |
| No unofficial blogs, social media, or commercial health sites | ✅ | |
| Link text is specific (not “click here”) | ✅ | e.g. “View housing advice”, “Use NHS 111 guidance” |
| External links use `rel="noopener noreferrer"` | ✅ | Support Finder and Care Options |
| New-tab behaviour communicated in link label / note | ✅ | `aria-label` + visible note |
| Site does not imply affiliation with listed organisations | ✅ | Footer footnote |
| Non-medical wording throughout | ✅ | Signposting language; no diagnostic or treatment advice |
| Care Options uses service navigation wording only | ✅ | No “triage”, symptom checker, or “you should go to…” language |
| Care Options disclaimer visible near section top | ✅ | States no medical advice, symptom assessment, or emergency response |
| No symptom input or personal health data collection | ✅ | Read-only guide; no forms in Care Options section |
| Urgent disclaimer present | ✅ | Crisis banner + Support Finder note + Care Options intro |
| Phone numbers in plain text (not misleading `tel:` links) | ✅ | Samaritans number in next-step text only |

---

## Issues Found

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | JSON fetch fails when opening `index.html` directly (file protocol) | Medium | Documented — local server required |
| 2 | No automated CI accessibility testing | Low | Documented as future improvement |
| 3 | Limited screen reader testing in this report | Medium | Manual keyboard testing only; NVDA/VoiceOver recommended |
| 4 | Lighthouse / axe scores not yet recorded in this document | Low | Placeholders provided — run before submission |

No critical accessibility blockers identified during V0.5 manual keyboard review.

---

---

---

## Health Tip Cards Tests (V0.9)

| Test | Pass? | Notes |
|------|-------|-------|
| Guide cards have clear headings | ✅ | `<article class="guide-card">` with descriptive `h3` titles |
| Guide links are descriptive | ✅ | Source links use organisation labels; no “click here” |
| Topic pages render correct guides | ✅ | Filtered by `data-topic` on six topic hub pages |
| Empty state appears where no tips exist | ✅ | Community & Sport shows “No health tips are available for this topic yet.” |
| `guides.html` search and filters work | ✅ | Topic filter buttons and `#guide-search` filter title/summary |
| Keyboard navigation through guide cards and filters | ✅ | Tab through filter buttons, search input and source links |
| Metadata readable in light and dark mode | ✅ | Source type, audience, read time, last checked and risk level as text |
| Print output includes guide summaries and source links | ✅ | Guide cards print with URLs appended to external links |
| No diagnostic, legal, financial or immigration advice wording | ✅ | Signposting-only disclaimers on every guide card |
| Console free of errors on pages without guide containers | ✅ | `initGuides()` exits when no `[data-guides-container]` or `[data-guides-all]` |
| Data loads from `articles.json` | ✅ | Requires local HTTP server for `fetch()` |

---

## Fixes Made (V0.9)

| Fix | Description |
|-----|-------------|
| **Articles data model** | Added `data/articles.json` with 8 health tips and structured metadata |
| **Health tip card rendering** | Reusable JS functions with defensive container checks |
| **Health Tips page** | `guides.html` with topic filters and search; linked from footer and topic pages |
| **Print and dark mode** | Guide card styles extended for `data-theme="dark"` and `@media print` |

---

## Multi-page Testing Checklist (V0.8)

| Test | Pass? | Notes |
|------|-------|-------|
| Header nav works on every page | ✅ | 9 pages with shared global navigation |
| `aria-current="page"` on active nav link | ✅ | One current link per page |
| Skip link works on every page | ✅ | `#main-content` target on all pages |
| Page titles are unique | ✅ | Descriptive `<title>` per page |
| Heading hierarchy is valid | ✅ | One `h1` per page; nested sections use `h2`/`h3` |
| External links are descriptive | ✅ | Official/expert link text; `rel="noopener noreferrer"` |
| Footer appears on every page | ✅ | Shared footer with site links |
| Mobile nav/layout on every page | ✅ | Collapsible nav below 1100px |
| Print CSS on topic pages | ✅ | Topic content and source notes print |
| Dark mode on topic pages | ✅ | Shared `data-theme` toggle |
| No console errors without Support Finder | ✅ | `script.js` guards optional containers |
| Resource Library search/filter | ✅ | `resources.html` loads JSON and filters |
| Homepage featured resources preview | ✅ | `#featured-resources` loads subset from JSON |

---

## Content Clarity Review (V0.7)

| Check | Pass? | Notes |
|-------|-------|-------|
| Site purpose is clear from the hero section | ✅ | International Student Wellbeing Navigator tagline and subheading |
| Target audience is clear | ✅ | International students in the UK |
| Source policy is easy to find | ✅ | Hero CTA links to `#source-policy`; also in header nav |
| Disclaimers are visible but not overwhelming | ✅ | Hero note, Support Finder note, Source Policy, footer |
| Link text remains descriptive | ✅ | Specific link labels on cards and guides |
| Categories are understandable | ✅ | Updated topic labels in filters and resource cards |
| No wording implies diagnosis, treatment or professional advice | ✅ | Signposting language; FAQ clarifies limits |
| Site not positioned as medical advice or triage | ✅ | Care Options secondary; no symptom input |

---

## Care Options Guide Tests (V0.6)

| Test | Pass? | Notes |
|------|-------|-------|
| Care Options nav link in header | ✅ | Between Support Finder and Wellbeing Tips |
| Section placement after Support Finder | ✅ | Before Wellbeing Tips |
| Data loads from `care-options.json` | ✅ | Requires local server |
| Four care option cards render | ✅ | Pharmacy, GP/Student Health, NHS 111, 999/A&E |
| Pharmacy First panel renders | ✅ | Conditions list + NHS link |
| External links open in new tab | ✅ | `target="_blank"` + `rel="noopener noreferrer"` |
| Keyboard navigation through cards | ✅ | Tab through links and lists |
| Dark mode contrast readable | ✅ | Cards, disclaimer, and links checked in `data-theme="dark"` |
| Print output includes Care Options | ✅ | Cards, disclaimer, Pharmacy First panel, URLs |
| No “triage” or “symptom checker” in UI | ✅ | Service navigation wording only |
| Console free of load errors | ✅ | When served via HTTP |

---

## Fixes Made (V0.8)

| Fix | Description |
|-----|-------------|
| **Multi-page IA** | Split single-page site into Home, Resource Library, 6 topic hubs and About |
| **Shared navigation** | Global nav with `aria-current="page"` and relative GitHub Pages links |
| **Defensive JS** | Optional features initialised only when DOM containers exist |
| **Care Options placement** | Healthcare route guide on `health-healthcare.html` |

---

## Fixes Made (V0.7)

| Fix | Description |
|-----|-------------|
| **Positioning cleanup** | Reframed site as International Student Wellbeing Navigator across hero, metadata, README and FAQ |
| **Source Policy** | Added accessible section explaining official, expert and student-facing sources |
| **Category labels** | Updated filters and JSON categories for international student topics |
| **Source quality labels** | Added `sourceType`, `audience`, `lastChecked` to resource cards |

---

## Fixes Made (V0.6)

| Fix | Description |
|-----|-------------|
| **Care Options Guide** | Added accessible service navigation section with JSON-driven cards and Pharmacy First panel |
| **Print stylesheet** | Extended to include care option cards, disclaimer, and official URLs |
| **Documentation** | Updated README, CHANGELOG, and this test report for V0.6 content safety checks |

---

## Fixes Made (V0.5)

| Fix | Description |
|-----|-------------|
| **Print stylesheet** | Added `@media print` for offline support reference — hides nav, search, filters, demo form; keeps cards, links (with URLs), disclaimers |
| **System dark mode** | Added `@media (prefers-color-scheme: dark)` using CSS variables; contrast-checked text, links, badges, and focus states |
| **Accessibility test record** | Created this report with environment, checklists, and placeholders for Lighthouse/axe |
| **Documentation** | Updated README and CHANGELOG with testing method and content governance notes |

---

## Known Limitations

- **No backend** — feedback form is demo-only; no data is sent or stored
- **Local server required** — `fetch('./data/resources.json')` does not work from `file://`
- **Manual testing only** — Lighthouse and axe results should be added before final portfolio submission
- **Theme preference** — manual header toggle; saved in browser `localStorage`
- **Print FAQ** — all answers print expanded; accordion controls hidden in print view
- **English only** — no translation or localisation
- **Link maintenance** — official URLs in `data/resources.json` and `data/care-options.json` should be reviewed periodically
- **Care Options Guide** — service navigation only; not a medical device, not diagnostic, not emergency support
- **Not affiliated** — HealthLens is a student portfolio project, not an official university or SU service

---

## Recommended Next Tests

1. Run Lighthouse Accessibility on live GitHub Pages URL
2. Run axe DevTools full-page scan and record results above
3. Test with NVDA (Windows) or VoiceOver (macOS/iOS)
4. Ask a peer to complete a task using keyboard only: “Find housing support and open the official link”
5. Re-test after any content changes to `data/resources.json` or `data/care-options.json`
6. Print preview: confirm Care Options Guide cards and Pharmacy First panel appear with URLs

---

*This report supports the HealthLens Web & Digital Content Coordinator portfolio application.*
