# HealthLens — Student Wellbeing & Support Hub

**Live demo:** [https://li2043.github.io/HealthLens-Web/](https://li2043.github.io/HealthLens-Web/)

**Version 0.2** · A static, accessible student support website built for a Web & Digital Content Coordinator application.

---

## Project Overview

HealthLens is a frontend-only portfolio project that helps university students find wellbeing and support resources quickly. It demonstrates practical skills in HTML, CSS, JavaScript, responsive layout, digital content organisation, and WCAG-informed accessibility.

The site includes a searchable Support Finder, wellbeing tips, an FAQ accordion, a validated contact form, and an accessibility statement. It is designed to be deployed via GitHub Pages with no backend or build step required.

> **Important:** This is a student project. It does not provide medical advice, diagnosis, or treatment recommendations.

---

## Why I Built This

I built HealthLens to show how thoughtful web content and UX can help students navigate support options during stressful periods. For a Web & Digital Content Coordinator role — particularly at a students' union — I wanted a live example that combines:

- Clear, student-friendly content structure
- Practical front-end development without unnecessary frameworks
- Accessibility as a core design requirement, not an afterthought
- Safe, responsible wording around wellbeing topics

This project was designed to practise:

- **HTML / CSS / JavaScript** — semantic markup, layout, and interactivity
- **Responsive layout** — mobile-first patterns with flexible grids
- **Accessible forms** — visible labels, validation, and error messaging
- **Searchable and filterable content** — dynamic resource cards from structured data
- **Digital content structure** — organised sections, headings, and signposting
- **UX thinking** — clarity, urgency levels, and suggested next steps
- **Git / GitHub workflow** — clean repo structure ready for version control and deployment
- **WCAG-informed design decisions** — keyboard access, focus states, contrast, and plain language

---

## Target Users

- **University students** looking for wellbeing and support signposting
- **Student services teams** evaluating how content can be organised online
- **Employers / reviewers** assessing front-end, content, and accessibility skills

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Support Finder** | 12 signposting cards with official links, urgency levels, and suggested next steps |
| **Search & filter** | Keyword search plus category filter buttons (All, Academic, Wellbeing, etc.) |
| **Wellbeing Tips** | 4 short, non-medical self-reflection tips |
| **FAQ accordion** | Expand/collapse with keyboard support and `aria-expanded` |
| **Contact form** | Frontend validation with accessible error messages |
| **Accessibility statement** | Documents the project's inclusive design approach |
| **Crisis banner** | Prominent urgent help signposting with 999 / NHS 111 guidance |
| **Results count** | Visible filter feedback plus screen reader live region |
| **Skip link** | "Skip to main content" for keyboard and screen reader users |

---

## Tech Stack

- **HTML5** — semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — custom properties, flexbox, grid, media queries
- **Vanilla JavaScript** — no frameworks, no build tools
- **GitHub Pages** — static hosting

No React, TypeScript, backend, database, authentication, AI, or external APIs in V0.2.

---

## Version 0.2 — Visual Upgrade

This release refines layout and visual hierarchy while keeping the same accessible, vanilla stack:

| Improvement | Description |
|-------------|-------------|
| **Hero redesign** | Two-column layout with “How it works” steps and clear call-to-action buttons |
| **Urgent help banner** | High-contrast crisis signposting with link to urgent filter |
| **Enhanced resource cards** | Category icons, colour-coded pills, urgency dots, and urgent card styling |
| **Results count** | Visible “Showing X of Y resources” feedback |
| **Section styling** | Eyebrow labels, alternating backgrounds, improved spacing |
| **Contact as feedback** | Form presented in a card layout with clearer demo purpose |
| **Footer refresh** | Three-column footer with page links and disclaimer |
| **Favicon** | Simple SVG brand mark in `assets/favicon.svg` |

Design references: [GOV.UK Design System](https://design-system.service.gov.uk/), [W3C WAI](https://www.w3.org/WAI/design-develop/), and [Inclusive Components](https://inclusive-components.design/) — prioritising clarity and contrast over decorative effects.

---

## Official Support Links

HealthLens **signposts to** official support resources. It does not provide counselling, diagnosis, emergency response, or medical advice, and it is **not affiliated** with Bristol SU, the University of Bristol, the NHS or Samaritans.

I used official support links to practise responsible digital content design, safe signposting, accessibility-aware link text and user-centred information architecture.

| Organisation | Resources signposted on this site |
|--------------|-----------------------------------|
| **Bristol SU** | Academic advice, health & welfare, housing advice, groups, volunteering |
| **University of Bristol** | Academic advice, wellbeing appointments, money advice, international support, disability support |
| **NHS** | Urgent mental health help |
| **Samaritans** | Confidential listening support |

All external links open in a new tab with `rel="noopener noreferrer"`, descriptive link text, and accessible labels that state the link opens an official page in a new tab.

---

## Accessibility Considerations

HealthLens follows WCAG-informed practices throughout:

- Semantic HTML with logical heading hierarchy
- Visible labels on all form fields (not placeholder-only)
- Keyboard-accessible navigation, filters, accordion, and form
- Strong `:focus-visible` styles on interactive elements
- Readable colour contrast and font sizes
- `aria-expanded` on FAQ buttons and accordion panels
- Live region announcements for search/filter results
- Reduced-motion support via `prefers-reduced-motion`
- Clear non-medical wording and disclaimers

See [`accessibility-checklist.md`](accessibility-checklist.md) for a detailed review checklist.

---

## How to Run Locally

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/Li2043/HealthLens-Web.git
   cd HealthLens-Web
   ```

2. **Open the site** — no install or build step required:
   - Double-click `index.html`, or
   - Use a local server (recommended for best behaviour):
     ```bash
     # Python 3
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000`

3. **Verify functionality:**
   - Search and category filters update resource cards
   - FAQ accordion opens/closes with mouse and keyboard
   - Contact form shows validation errors and success message

---

## How to Deploy with GitHub Pages

1. Push this project to a GitHub repository.
2. Go to **Settings → Pages** in your repository.
3. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`) → `/ (root)`
4. Save. GitHub will publish the site at:
   ```
   https://li2043.github.io/HealthLens-Web/
   ```
5. Confirm `index.html`, `styles.css`, and `script.js` are in the repository root.

---

## What I Learned

- Structuring support content with urgency levels helps students prioritise next steps
- Dynamic rendering from a JavaScript array keeps content maintainable without a CMS
- Accessible forms require visible labels, clear errors, and logical focus management
- Filter buttons benefit from `aria-pressed` to communicate state to assistive technology
- A skip link and strong focus styles make a meaningful difference for keyboard users
- Urgency is shown with colour **and** text labels, not colour alone
- Visual hierarchy can improve without sacrificing WCAG-informed practices
- A dedicated crisis banner helps signpost urgent support responsibly
- Official links need clear labels, visible external cues, and safe non-affiliated wording

---

## Changelog

- **v0.2 (content update)** — 12 official signposting links (Bristol SU, UoB, NHS, Samaritans), external link accessibility, support disclaimers
- **v0.2** — Visual refresh: hero panel, crisis banner, card icons, footer, favicon
- **v0.1** — Initial static release with Support Finder, FAQ, form validation, and accessibility docs

---

## Future Improvements

- Integrate a lightweight CMS or JSON file for easier content updates
- Add automated accessibility testing in CI (e.g. axe-core, pa11y)
- Schedule regular review of official link URLs and page content

---

## File Structure

```
healthlens/
├── index.html
├── styles.css
├── script.js
├── README.md
├── accessibility-checklist.md
└── assets/
    └── favicon.svg
```

---

## Licence & Disclaimer

This is a portfolio demo project. Content is for illustration only and does not constitute medical or professional advice. Always use official university and NHS services for health and wellbeing concerns.

---

*Built as Version 0.2 for a Web & Digital Content Coordinator application.*
