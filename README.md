# HealthLens — Student Wellbeing & Support Hub

**Live demo:** [https://li2043.github.io/HealthLens-Web/](https://li2043.github.io/HealthLens-Web/)

**Version 0.1** · A static, accessible student support website built for a Web & Digital Content Coordinator application.

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
| **Wellbeing Tips** | 4 short, non-medical self-reflection tips |
| **FAQ accordion** | Expand/collapse with keyboard support and `aria-expanded` |
| **Feedback form** | Frontend validation with accessible error messages |
| **Crisis banner** | Prominent urgent help signposting with 999 / NHS 111 guidance |
| **Accessibility statement** | Documents the project's inclusive design approach |
| **Skip link** | "Skip to main content" for keyboard and screen reader users |

---

## Tech Stack

- **HTML5** — semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — custom properties, flexbox, grid, media queries
- **Vanilla JavaScript** — `fetch`, async/await, no frameworks, no build tools
- **JSON** — structured support content in `data/resources.json`
- **GitHub Pages** — static hosting

No React, TypeScript, backend, database, authentication, AI, or external APIs.

---

## Data & Content Structure

The support resources are stored in `data/resources.json` to separate digital content from rendering logic. This makes the project easier to maintain and closer to a real content-managed website workflow.

Each resource object includes:

| Field | Purpose |
|-------|---------|
| `id` | Unique identifier for the card |
| `title` | Clear card heading |
| `category` | Filter category (`academic`, `wellbeing`, `housing`, etc.) |
| `urgency` | Low, Medium, or High |
| `description` | Short, plain-English summary |
| `nextStep` | Practical suggested action |
| `sourceLabel` | Official organisation or page name |
| `sourceUrl` | Official external URL |
| `linkText` | Specific, accessible link label |

`script.js` fetches `./data/resources.json` using a relative path, normalises the data, and renders cards dynamically. If loading fails, a clear error message is shown in the Support Finder area.

---

## Accessibility Considerations

HealthLens follows WCAG-informed practices throughout:

- Semantic HTML with logical heading hierarchy
- Visible labels on all form fields (not placeholder-only)
- Keyboard-accessible navigation, filters, accordion, and form
- Strong `:focus-visible` styles on links, buttons, and form controls
- Readable colour contrast and font sizes
- `aria-expanded` on FAQ buttons and accordion panels
- Live region announcements for search/filter results
- Descriptive external link text with clear new-tab labelling
- Reduced-motion support via `prefers-reduced-motion`
- Clear non-medical wording and disclaimers

See [`accessibility-checklist.md`](accessibility-checklist.md) for a detailed review checklist.

---

## Responsible Signposting & Non-Medical Wording

HealthLens **signposts to** official support resources. It does not provide counselling, diagnosis, emergency response, or medical advice, and it is **not affiliated** with Bristol SU, the University of Bristol, the NHS or Samaritans.

| Organisation | Resources signposted on this site |
|--------------|-----------------------------------|
| **Bristol SU** | Academic advice, health & welfare, housing advice, groups, volunteering |
| **University of Bristol** | Academic advice, wellbeing appointments, money advice, international support, disability support |
| **NHS** | Urgent mental health help |
| **Samaritans** | Confidential listening support |

All external links open in a new tab with `rel="noopener noreferrer"`, descriptive link text, and accessible labels.

---

## How to Run Locally

A local server is required so `fetch()` can load `data/resources.json`. Opening `index.html` directly in the browser (double-click) will not load the JSON file correctly.

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/Li2043/HealthLens-Web.git
   cd HealthLens-Web
   ```

2. **Start a local server:**
   ```bash
   # Python 3
   python -m http.server 8000
   ```

3. **Visit** `http://localhost:8000`

4. **Verify functionality:**
   - Support cards load from `data/resources.json`
   - Search for `housing`, `money`, and `urgent`
   - Category filters update the card list
   - FAQ accordion works with keyboard
   - Contact form validation works
   - Official links open in a new tab

---

## How to Deploy with GitHub Pages

1. Push this project to a GitHub repository.
2. Go to **Settings → Pages** in your repository.
3. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` → `/ (root)`
4. Save. GitHub will publish the site at:
   ```
   https://li2043.github.io/HealthLens-Web/
   ```
5. Confirm these files are in the repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `data/resources.json`

All asset paths use relative URLs (`./styles.css`, `./script.js`, `./data/resources.json`) so the site works on GitHub Pages.

---

## Future Improvements

- Schedule regular review of official link URLs and page content
- Add automated accessibility testing in CI (e.g. axe-core, pa11y)
- Add a print-friendly stylesheet for offline reference
- Conduct testing with screen readers and real students
- Add dark mode with accessible contrast checks

---

## File Structure

```
healthlens/
├── index.html
├── styles.css
├── script.js
├── README.md
├── accessibility-checklist.md
├── data/
│   └── resources.json
└── assets/
    └── favicon.svg
```

---

## Licence & Disclaimer

This is a portfolio demo project. Content is for illustration only and does not constitute medical or professional advice. Always use official university and NHS services for health and wellbeing concerns.

---

*Built as Version 0.1 for a Web & Digital Content Coordinator application.*
