# HealthLens — International Student Wellbeing Navigator

**Live demo:** [https://li2043.github.io/HealthLens-Web/](https://li2043.github.io/HealthLens-Web/)

**Version 0.7** · A responsive student-facing information website built for a Web & Digital Content Coordinator application.

---

## V0.7 Update Summary

V0.7 focused on **positioning cleanup**. The project was reframed from a broad health-support concept into an **International Student Wellbeing Navigator**, with clearer audience definition, source policy, category labels, disclaimers and README wording.

| Change | Purpose |
|--------|---------|
| **Product positioning** | International students in the UK — wellbeing and practical support, not medical advice |
| **Hero & metadata** | Clear tagline, audience and value proposition |
| **Category labels** | Academic, Physical/Mental Wellbeing, Housing, Money, International Life, Community, Urgent Help |
| **Source quality labels** | `sourceType`, `audience`, `lastChecked` on support resources |
| **Source Policy section** | Explains official vs expert vs student-facing sources |
| **Wellbeing Guides** | Reframed tips as practical guide topics with official links |

See [`CHANGELOG.md`](CHANGELOG.md) for full version history.

---

## Project overview

HealthLens is a responsive student-facing information website that helps **international students in the UK** navigate trusted support resources across study, wellbeing, housing, money, community and urgent help.

It is **not** a medical advice website, symptom checker, triage tool, legal advice service, financial advice service, immigration advice service, or emergency response service.

Its value is **more than a link directory**:

- Clear categorisation by student life topic
- Plain-English summaries
- Source quality labels (official, expert, student-facing)
- Suggested next-step guidance
- Responsible signposting to trusted resources
- Accessible, responsive interface
- International-student context

---

## Why I built this

International students often need to understand multiple UK systems at once: university support, healthcare routes, housing, money, student life and urgent services. HealthLens explores how accessible digital content, clear categorisation and responsible signposting can reduce confusion.

For a Web & Digital Content Coordinator role — particularly at a students' union — I wanted a live example that combines student-friendly content structure, practical front-end development, accessibility as a core requirement, and safe wording around wellbeing topics.

---

## What this project demonstrates

- HTML, CSS and JavaScript
- Responsive layout
- JSON-based content structure (`data/resources.json`, `data/care-options.json`)
- Search and filtering
- Accessible forms and navigation
- Plain-English digital content
- Source quality labelling
- Responsible non-diagnostic wording
- GitHub Pages deployment

---

## What this project does not do

- It does not provide medical advice.
- It does not provide legal, financial or immigration advice.
- It does not assess symptoms.
- It does not replace official sources.
- It does not provide emergency support.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Support Finder** | 12 resources with category filters, source labels, urgency levels and next steps |
| **Care Options Guide** | Secondary UK healthcare route guide — service navigation only |
| **Wellbeing Guides** | Practical guide topics linking to official sources |
| **Source Policy** | How official, expert and student-facing sources are prioritised |
| **Search & filter** | Keyword search plus topic filters |
| **Print-friendly layout** | `@media print` stylesheet for offline reference |
| **Dark mode toggle** | Manual light/dark switch; preference saved in `localStorage` |
| **FAQ accordion** | Keyboard-accessible with `aria-expanded` |
| **Feedback form** | Frontend validation (demo only) |
| **Crisis banner** | 999 / NHS 111 guidance for urgent help |

---

## Tech Stack

- **HTML5** — semantic landmarks and logical heading hierarchy
- **CSS3** — custom properties, flexbox, grid, print and dark-mode styles
- **Vanilla JavaScript** — `fetch`, async/await, no frameworks
- **JSON** — content separated from rendering logic
- **GitHub Pages** — static hosting

No React, TypeScript, backend, database, authentication, AI, or external APIs.

---

## Data & Content Structure

Support resources live in `data/resources.json`. Care route content lives in `data/care-options.json`.

Each resource includes: `id`, `title`, `category`, `urgency`, `description`, `nextStep`, `sourceLabel`, `sourceUrl`, `linkText`, `sourceType`, `audience`, and `lastChecked`.

Categories: Academic, Physical Wellbeing, Mental Wellbeing, Housing, Money, International Life, Community, Urgent Help.

---

## How to Run Locally

A local server is required so `fetch()` can load JSON files.

```bash
git clone https://github.com/Li2043/HealthLens-Web.git
cd HealthLens-Web
python -m http.server 8000
```

Visit `http://localhost:8000`

**Verify:**
- Hero shows International Student Wellbeing Navigator positioning
- 12 support cards load with source labels
- Category filters use updated labels
- Source Policy section reachable from hero CTA
- Care Options Guide loads (secondary section)
- Print preview, dark mode, FAQ and form validation still work
- No console errors

---

## How to Deploy with GitHub Pages

1. Push to GitHub repository `main` branch
2. **Settings → Pages** → Deploy from branch `main` → `/ (root)`
3. Live URL: `https://li2043.github.io/HealthLens-Web/`
4. Confirm `data/resources.json` and `data/care-options.json` are in the repository

---

## Known Limitations

- **Demo form** — no data is sent or stored
- **Local server required** for JSON loading during development
- **Portfolio project** — not affiliated with Bristol SU, UoB, NHS, GOV.UK or Samaritans
- **Care Options Guide** — service navigation only; not diagnostic or emergency support
- **English only** — no localisation
- **Link maintenance** — review official URLs in JSON files periodically

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
│   ├── resources.json
│   └── care-options.json
└── assets/
    ├── favicon.svg
    └── tips/
```

---

## Testing documentation

- [`accessibility-checklist.md`](accessibility-checklist.md) — pre-release checklist
- [`accessibility-test-report.md`](accessibility-test-report.md) — manual test record with content clarity review

---

## Licence & Disclaimer

This is a portfolio demo project. Content is for illustration only and does not constitute professional advice. Always use official university, NHS and expert services for wellbeing, housing, money and urgent concerns.

---

*Built as Version 0.7 for a Web & Digital Content Coordinator application.*
