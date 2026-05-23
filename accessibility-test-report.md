# HealthLens Accessibility Test Report

**Project:** HealthLens — Student Wellbeing & Support Hub  
**Version tested:** 0.5  
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
- FAQ accordion
- Contact form (validation states)
- Print preview (visual check only)

---

## Manual Keyboard-Only Test Checklist

Test using **Tab**, **Shift+Tab**, **Enter**, and **Space** only (no mouse).

| Test | Pass? | Notes |
|------|-------|-------|
| Skip link appears on focus and jumps to main content | ✅ | `#main-content` target |
| Header navigation links reachable | ✅ | Support Finder, Wellbeing Tips, FAQ, Contact |
| Theme toggle reachable and usable | ✅ | `aria-pressed` updates; preference saved in `localStorage` |
| Mobile nav toggle reachable (at mobile width) | ✅ | `aria-expanded` updates |
| Search input reachable | ✅ | Label associated with input |
| Category filter buttons reachable and usable | ✅ | `aria-pressed` updates on selection |
| Resource card external links reachable | ✅ | Focus visible; opens in new tab |
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
| No unofficial blogs, social media, or commercial health sites | ✅ | |
| Link text is specific (not “click here”) | ✅ | e.g. “View housing advice”, “Contact Samaritans” |
| External links use `rel="noopener noreferrer"` | ✅ | |
| New-tab behaviour communicated in link label / note | ✅ | `aria-label` + visible note |
| Site does not imply affiliation with listed organisations | ✅ | Disclaimer in Support Finder |
| Non-medical wording throughout | ✅ | Signposting language; no diagnosis or treatment advice |
| Urgent disclaimer present | ✅ | Crisis banner + Support Finder signposting note |
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
- **Link maintenance** — official URLs in `data/resources.json` should be reviewed periodically
- **Not affiliated** — HealthLens is a student portfolio project, not an official university or SU service

---

## Recommended Next Tests

1. Run Lighthouse Accessibility on live GitHub Pages URL
2. Run axe DevTools full-page scan and record results above
3. Test with NVDA (Windows) or VoiceOver (macOS/iOS)
4. Ask a peer to complete a task using keyboard only: “Find housing support and open the official link”
5. Re-test after any content changes to `data/resources.json`

---

*This report supports the HealthLens Web & Digital Content Coordinator portfolio application.*
