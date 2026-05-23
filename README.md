# HealthLens — Student Wellbeing & Support Hub

**Live demo:** [https://li2043.github.io/HealthLens-Web/](https://li2043.github.io/HealthLens-Web/)

**Version 0.5** · A static, accessible student support website built for a Web & Digital Content Coordinator application.

---

## V0.5 Update Summary

Version 0.5 focuses on **accessibility evidence**, **offline usability**, and **system-aware presentation** — without adding new product features or frameworks.

| Addition | Purpose |
|----------|---------|
| **Print CSS** | Lets students print support signposting cards with official URLs for offline reference |
| **System dark mode** | Respects `prefers-color-scheme: dark` with contrast-safe CSS variables |
| **Accessibility test report** | Documents manual testing, link safety review, and placeholders for Lighthouse/axe |
| **CHANGELOG** | Records project evolution from V0.1 to V0.5 |

See [`CHANGELOG.md`](CHANGELOG.md) for full version history.

---

## Project Overview

HealthLens is a frontend-only portfolio project that helps university students find wellbeing and support signposting quickly. It demonstrates practical skills in HTML, CSS, JavaScript, responsive layout, digital content organisation, and WCAG-informed accessibility.

The site includes a searchable Support Finder, wellbeing tips, an FAQ accordion, a validated feedback form, and an accessibility statement. Support card content is stored separately in `data/resources.json` and loaded at runtime. The project is designed to be deployed via GitHub Pages with no backend or build step required.

> **Important:** This is a student project. It does not provide medical advice, diagnosis, or treatment recommendations.

---

## Why I Built This

I built HealthLens to show how thoughtful web content and UX can help students navigate support options during stressful periods. For a Web & Digital Content Coordinator role — particularly at a students' union — I wanted a live example that combines:

- Clear, student-friendly content structure
- Practical front-end development without unnecessary frameworks
- Accessibility as a core design requirement, not an afterthought
- Safe, responsible wording around wellbeing topics
- Separation of content from presentation, similar to a lightweight content workflow

I used official support links to practise responsible digital content design, safe signposting, accessibility-aware link text and user-centred information architecture.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Support Finder** | 12 signposting cards with official links, urgency levels, and suggested next steps |
| **External JSON content** | Support resources loaded from `data/resources.json` |
| **Search & filter** | Keyword search plus category filter buttons (All, Academic, Wellbeing, etc.) |
| **Print-friendly layout** | `@media print` stylesheet for offline support reference |
| **Dark mode toggle** | Manual light/dark switch in header; preference saved in `localStorage` |
| **Wellbeing Tips** | 4 short, non-medical self-reflection tips |
| **FAQ accordion** | Expand/collapse with keyboard support and `aria-expanded` |
| **Feedback form** | Frontend validation with accessible error messages (demo only) |
| **Crisis banner** | Prominent urgent help signposting with 999 / NHS 111 guidance |
| **Accessibility testing record** | [`accessibility-test-report.md`](accessibility-test-report.md) |
| **Skip link** | "Skip to main content" for keyboard and screen reader users |

---

## Screenshots (Placeholder)

_Add portfolio screenshots here before submission:_

| Screenshot | Description |
|------------|-------------|
| _[Add image]_ | Desktop — Support Finder with resource cards |
| _[Add image]_ | Mobile — responsive layout and crisis banner |
| _[Add image]_ | Print preview — offline support reference |
| _[Add image]_ | Lighthouse accessibility score (optional) |

Suggested path: `assets/screenshots/` (create when ready)

---

## Tech Stack

- **HTML5** — semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — custom properties, flexbox, grid, print and dark-mode media queries
- **Vanilla JavaScript** — `fetch`, async/await, no frameworks, no build tools
- **JSON** — structured support content in `data/resources.json`
- **GitHub Pages** — static hosting

No React, TypeScript, backend, database, authentication, AI, or external APIs.

---

## Data & Content Structure

The support resources are stored in `data/resources.json` to separate digital content from rendering logic. This makes the project easier to maintain and closer to a real content-managed website workflow.

Each resource object includes: `id`, `title`, `category`, `urgency`, `description`, `nextStep`, `sourceLabel`, `sourceUrl`, and `linkText`.

`script.js` fetches `./data/resources.json` using a relative path, normalises the data, and renders cards dynamically. If loading fails, a clear error message is shown in the Support Finder area.

---

## Content Governance

- **Official links only** — Bristol SU, University of Bristol, NHS, and Samaritans
- **Review date** — Content last reviewed: May 2026 (noted in Support Finder)
- **Non-affiliation** — HealthLens is a student portfolio project, not an official service
- **Update workflow** — Edit `data/resources.json` for content changes; verify links periodically
- **Safe wording** — Signposting language only; no diagnosis, treatment advice, or outcome promises

---

## Accessibility Considerations

HealthLens follows WCAG-informed practices throughout:

- Semantic HTML with logical heading hierarchy
- Visible labels on all form fields (not placeholder-only)
- Keyboard-accessible navigation, filters, accordion, and form
- Strong `:focus-visible` styles on links, buttons, and form controls
- Readable colour contrast in light mode, dark mode, and print
- `aria-expanded` on FAQ buttons; live regions for filter results
- Descriptive external link text with clear new-tab labelling
- Reduced-motion support via `prefers-reduced-motion`
- Clear non-medical wording and disclaimers

**Testing documentation:**
- [`accessibility-checklist.md`](accessibility-checklist.md) — pre-release checklist
- [`accessibility-test-report.md`](accessibility-test-report.md) — V0.5 test record with Lighthouse/axe placeholders

### Accessibility Testing Method (V0.5)

1. Run site locally via `python -m http.server 8000`
2. Complete manual keyboard-only checklist (Tab, Shift+Tab, Enter, Space)
3. Run Chrome Lighthouse → Accessibility category
4. Run axe DevTools full-page scan
5. Test print preview (Ctrl+P) — confirm cards, links, and disclaimers print correctly
6. Test at 320px, 768px, and 1280px viewport widths
7. Test light/dark mode using the header toggle
8. Check browser console for errors on load and interaction
9. Record Lighthouse and axe results in `accessibility-test-report.md`

---

## Responsible Signposting & Non-Medical Wording

HealthLens **signposts to** official support resources. It does not provide counselling, diagnosis, emergency response, or medical advice, and it is **not affiliated** with Bristol SU, the University of Bristol, the NHS or Samaritans.

| Organisation | Resources signposted on this site |
|--------------|-----------------------------------|
| **Bristol SU** | Academic advice, health & welfare, housing advice, groups, volunteering |
| **University of Bristol** | Academic advice, wellbeing appointments, money advice, international support, disability support |
| **NHS** | Urgent mental health help |
| **Samaritans** | Confidential listening support |

---

## How to Run Locally

A local server is required so `fetch()` can load `data/resources.json`. **Do not** rely on double-clicking `index.html`.

```bash
git clone https://github.com/Li2043/HealthLens-Web.git
cd HealthLens-Web
python -m http.server 8000
```

Visit `http://localhost:8000`

**Verify:**
- 12 support cards load from JSON
- Search: `housing`, `money`, `urgent`
- All category filters work
- FAQ keyboard interaction
- Form validation
- Print preview (Ctrl+P)
- Browser console has no errors

---

## How to Deploy with GitHub Pages

1. Push to GitHub repository `main` branch
2. **Settings → Pages** → Deploy from branch `main` → `/ (root)`
3. Live URL: `https://li2043.github.io/HealthLens-Web/`
4. Confirm `data/resources.json` is included in the repository

All paths are relative (`./styles.css`, `./script.js`, `./data/resources.json`).

---

## Known Limitations

- **Demo form** — no data is sent or stored
- **Local server required** for JSON loading during development
- **Manual a11y testing** — Lighthouse/axe scores should be added to test report before submission
- **Theme preference** — saved in browser `localStorage`; first visit follows system setting if none saved
- **English only** — no localisation
- **Link maintenance** — official URLs should be reviewed periodically
- **Not affiliated** — portfolio project only; not an official university or SU website

---

## Future Improvements

- Add Lighthouse and axe scores to CI or pre-deploy checklist
- Screen reader testing with NVDA / VoiceOver
- Scheduled content review workflow for `data/resources.json`
- Portfolio screenshots in `assets/screenshots/`

---

## File Structure

```
healthlens/
├── index.html
├── styles.css
├── script.js
├── README.md
├── CHANGELOG.md
├── accessibility-checklist.md
├── accessibility-test-report.md
├── data/
│   └── resources.json
└── assets/
    └── favicon.svg
```

---

## Licence & Disclaimer

This is a portfolio demo project. Content is for illustration only and does not constitute medical or professional advice. Always use official university and NHS services for health and wellbeing concerns.

---

*Built as Version 0.5 for a Web & Digital Content Coordinator application.*
