# Changelog

All notable changes to HealthLens are documented in this file.

---

## [1.2] — May 2026

### Added
- **`case-study.html`** — portfolio-ready case study covering problem, IA, content model, search, accessibility, source governance, testing and limitations
- **`audit-report.html`** — web-readable accessibility and content audit with page-level status table
- **`docs/accessibility-audit.md`** — accessibility audit scope, automated and manual checklists
- **`docs/content-audit.md`** — content boundary, source governance and risk checks
- **`docs/manual-test-plan.md`** — keyboard path, search queries and content safety tests
- **Case study and audit CSS** — `.case-study-page`, `.audit-table`, `.decision-card`, `.status-badge` and print styles
- **Footer and About links** — Case Study, Audit Report and Source Policy in footer; case study and audit links on About page
- **Homepage CTA** — link to case study from home page

### Changed
- README, CHANGELOG and accessibility test report updated for V1.2 audit layer
- About page version note updated to 1.2

---

## [1.1] — May 2026

### Added
- **Source metadata schema** — `sourceType`, `sourceAuthority`, `audience`, `region`, `riskLevel`, `lastChecked`, `reviewFrequency`, `sourceNote` across JSON data files
- **Readable source badges** — `.source-label`, `.source-meta`, `.last-checked`, `.risk-label` on resource cards, health tip cards and search results
- **`formatDateForDisplay()`, `getSourceTypeClass()`, `renderSourceMetadata()`, `normaliseSourceMetadata()`** — shared metadata rendering in `script.js`
- **Source label legend** — collapsible legend on `resources.html` and `search.html`
- **Expanded About / Source Policy** — label definitions, “Last checked” meaning, content limitations and proposed maintenance schedule

### Changed
- All resources and articles use ISO `lastChecked` dates (`2026-05-25`)
- Health tips use `Project note` as source type with `HealthLens` as authority
- Topic pages in `data/topics.json` include site page metadata for search
- Search index includes authority, risk level and formatted last checked values

---

## [1.0] — May 2026

### Added
- **`search.html`** — global search page with keyword search, type filters and topic filters
- **`data/topics.json`** — searchable metadata for Home, Resource Library, topic hubs and About
- **Unified client-side search index** — combines topic pages, support resources and health tips
- **`initGlobalSearch()`** and related helpers in `script.js` with defensive page guards
- **Search result cards** — type badge, summary, topic, audience, source type, last checked and descriptive links
- **URL query support** — `q`, `type` and `topic` parameters via `URLSearchParams`
- **Header nav link** — Search entry point on all pages
- **Topic page CTAs** — subtle “Search HealthLens” links with suggested keywords
- Search CSS with dark mode and print support

### Improved
- Accessible live status messages for search results and empty states
- Graceful partial failure when individual JSON files cannot load
- README, CHANGELOG and accessibility test report updated for V1.0

---

## [0.9] — May 2026

### Added
- **`data/articles.json`** — structured health tip data model with topic, audience, source metadata and risk level
- **Health tip cards** — reusable `<article class="guide-card">` pattern with source links, key points and signposting disclaimers
- **Topic page health tip sections** — tips filtered by `data-topic` on International Essentials, Health, Mental Wellbeing, Housing, Money and Community pages
- **`guides.html`** — central Health Tips page with topic filter buttons and search
- **`loadArticles()`, `renderGuideCards()`, `filterArticlesByTopic()`, `renderFeaturedGuidesForPage()`** in `script.js`
- Guide card CSS with dark mode and print support
- Footer link to Health Tips (nav kept compact — Health Tips not added to top nav)

### Improved
- Editorial layer beyond resource links — short plain-English summaries that signpost to official or expert sources
- Empty state messaging when a topic has no guides yet
- README, CHANGELOG and accessibility test report updated for V0.9

---

## [0.8] — May 2026

### Added
- **Multi-page structure** — 9 static HTML pages with shared header, footer and navigation
- **Topic hub pages** — International Essentials, Health & Healthcare, Mental Wellbeing, Housing & Bills, Money & Spending, Community & Sport
- **`resources.html`** — central searchable Resource Library (Support Finder)
- **`about.html`** — project explanation, source policy (`#source-policy`), limitations, accessibility and technical overview
- Homepage topic cards, featured resources preview and source policy preview
- Breadcrumbs, topic page templates and `aria-current="page"` on active nav links
- URL category filter support on Resource Library (`?category=urgent-help`)

### Changed
- `script.js` — defensive initialisation (Support Finder, Care Options, FAQ, form only run when containers exist)
- Care Options Guide moved to `health-healthcare.html`
- Navigation expanded to global multi-page menu
- README and accessibility documentation updated for V0.8

---

## [0.7] — May 2026

### Changed — Positioning cleanup
- Reframed the project as an **International Student Wellbeing Navigator**
- Updated hero copy, site tagline, meta title and meta description
- Rewrote “How it works” as **What this site helps with** (three help cards)
- Updated Support Finder categories: Academic, Physical/Mental Wellbeing, Housing, Money, International Life, Community, Urgent Help
- Added **source quality labels** to `data/resources.json` (`sourceType`, `audience`, `lastChecked`) and rendered on resource cards
- Added **Source Policy** section (`#source-policy`) with hero CTA link
- Renamed Wellbeing Tips → **Wellbeing Guides** with reframed guide topics
- Updated Care Options Guide as secondary section with safer introductory wording
- Rewrote FAQ for international student audience and signposting clarity
- Updated README, accessibility documentation, footer and disclaimers

### Clarified
- HealthLens provides responsible signposting — not medical, legal, financial or immigration advice
- Not a symptom checker, triage tool or emergency response service

---

## [0.6] — May 2026

### Added
- **Care Options Guide** — service navigation section between Support Finder and Wellbeing Tips
- `data/care-options.json` — four UK healthcare route cards (Pharmacy, GP/Student Health, NHS 111, 999/A&E)
- Pharmacy First information panel with common conditions list and official NHS link
- `loadCareOptions()` and `renderCareOptions()` in `script.js` (alongside refactored `loadSupportResources()` / `renderSupportResources()`)
- Care Options nav link (`#care-options`) in header and footer
- Responsive 2-column care option card grid with distinct emergency card styling
- Print CSS support for Care Options Guide content and official URLs
- Dark mode styles for care option cards and Pharmacy First panel

### Content safety
- Non-diagnostic wording throughout; no symptom input or service recommendations
- Visible disclaimer: signposts to official services only; not medical advice or symptom assessment
- Official NHS and University of Bristol links with accessible external link labelling

---

## [0.5] — May 2026

### Added
- Print-friendly CSS (`@media print`) for offline support reference
- System dark mode via `@media (prefers-color-scheme: dark)` using CSS variables
- `accessibility-test-report.md` — manual testing record with Lighthouse/axe placeholders
- Keyboard-only test checklist and link/content safety review in test report

### Changed
- README updated with V0.5 summary, testing method, content governance, and known limitations
- Stylesheet version header updated to V0.5

### Print CSS highlights
- White background, black text
- Hides navigation, search, filters, demo contact form, and non-essential controls
- Keeps project title, disclaimers, resource cards, official links (with URLs), urgent information, wellbeing tips, FAQ answers, and accessibility statement
- Prevents support cards breaking across pages where possible

### Dark mode highlights
- Manual toggle in header (Light mode / Dark mode)
- Preference saved in `localStorage`
- First visit follows system setting if no saved preference
- Readable contrast for text, links, buttons, cards, urgency badges, and focus states

---

## [0.2] — May 2026

### Added
- Visual refresh: hero panel, crisis banner, enhanced resource cards, footer layout, favicon
- 12 official signposting links (Bristol SU, University of Bristol, NHS, Samaritans)
- External link accessibility: descriptive text, `rel="noopener noreferrer"`, new-tab labelling
- Signposting disclaimers and non-affiliation wording

---

## [0.1] — May 2026

### Added
- Initial static website: HTML, CSS, vanilla JavaScript
- Support Finder with search and category filters
- Wellbeing tips, FAQ accordion, validated feedback form
- Accessibility statement and skip link
- `accessibility-checklist.md` and employer-facing README
- GitHub Pages–ready relative asset paths

### Changed
- Support card data moved to `data/resources.json` (content separated from rendering logic)
- `script.js` loads resources with `fetch()` and async/await
- Graceful error message if JSON fails to load

---

## Version history summary

| Version | Focus |
|---------|--------|
| **0.1** | Static site, Support Finder, accessibility foundations, JSON content separation |
| **0.2** | Visual upgrade, official support links, responsible signposting |
| **0.5** | Print CSS, system dark mode, accessibility testing record |
| **0.6** | Care Options Guide — safe service navigation with `data/care-options.json` |
| **0.7** | Positioning cleanup — International Student Wellbeing Navigator |
| **0.8** | Multi-page structure — topic hubs and Resource Library |

---

*HealthLens is a student portfolio project. It signposts to official support services and does not provide medical advice.*
